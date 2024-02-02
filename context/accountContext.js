import { createContext, useState, useEffect } from "react";
import {
  getUserAccessToken,
  getUserInfo,
  recoverUserAccount,
  updateCustomerReq,
  updateCustomerAddressReq,
  deleteCustomerAddressReq,
} from "../lib/shopify";
import { v4 as uuidv4 } from "uuid";

import {
  getRegId,
  getWishlists,
  getWishlistItems,
  wishlistItemUpdate,
} from "../lib/swym";

const AccountContext = createContext();

export default function AccountProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    listerCode: "",
    email: "",
    password: "",
    errorMessage: "",
    loginStatus: false,
    uuid: "",
    token: "",
    checkingLogin: true,
    successMessage: "",
    orderHistory: [],
    wishlist: {
      status: false,
      lineItems: [],
      lineItemIds: [],
    },
  });

  function updateUserValue(valuesObject) {
    setUserInfo({ ...userInfo, ...valuesObject });

    return valuesObject;
  }

  const checkLoginStatus = async () => {
    if (localStorage.accountToken) {
      await sendUserRequest();
    } else {
      updateUserValue({ checkingLogin: false });
      localStorage.setItem("wishlistUuid", `${uuidv4()}`);
      // console.log(localStorage.getItem("wishlistUuid"));
    }
  };

  async function sendRecoveryRequest(event) {
    if (event) {
      event.preventDefault();
    }
    let response = await recoverUserAccount(userInfo.email);

    if (!response) {
      updateUserValue({
        errorMessage:
          "You have made too many recovery requests, please try again later.",
        successMessage: "",
      });
    } else {
      updateUserValue({
        successMessage:
          "If there is an account registered with us under that email address, you will receive an email shortly to update your password.",
        errorsMessage: "",
      });
    }
  }

  async function sendUserRequest(event) {
    if (event) {
      event.preventDefault();
    }
    // if no token, get token & user info, otherwise, just get user info
    if (!localStorage.accountToken) {
      const tokenRequest = await getUserAccessToken(
        userInfo.email,
        userInfo.password
      );
      // if credentials fail to produce token, set error message and login status to false
      if (!tokenRequest.customerAccessTokenCreate.customerAccessToken) {
        updateUserValue({
          errorMessage: "Sorry, we couldn't log you in with those details.",
          false: "errorMessage",
          checkingLogin: false,
        });
        return;
        // if token, update user info with token
      } else {
        updateUserValue({
          token: `${tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken}`,
          checkingLogin: false,
        });
        // store token in local storage
        localStorage.setItem(
          "accountToken",
          `${tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken}`
        );
        localStorage.removeItem("wishlistUuid");
      }
    }
    // request user info using token
    const infoRequest = await getUserInfo(localStorage.accountToken);
    // if token value, set user info values
    if (infoRequest.customer != null) {
      updateUserValue({
        firstName: `${infoRequest.customer.firstName}`,
        lastName: `${infoRequest.customer.lastName}`,
        email: `${infoRequest.customer.email}`,
        phone: `${infoRequest.customer.phone}`,
        userType: `${infoRequest.customer.userType.value}`,
        listerCode: `${infoRequest.customer.userCode.value}`,
        loginStatus: true,
        checkingLogin: false,
        errorMessage: null,
        addresses: infoRequest.customer.addresses,
        token: localStorage.accountToken,
        orderHistory: infoRequest.customer.orders.edges,
      });
      // token invalid, set error message and login status to false
    } else {
      updateUserValue({
        errorMessage: "Your session has expired, please login again.",
        loginStatus: false,
        checkingLogin: false,
      });
      localStorage.removeItem("accountToken");
    }
  }

  const updateCustomer = async (inputData) => {
    const input = {
      customer: inputData,
      customerAccessToken: `${userInfo.token}`,
    };

    let token = await updateCustomerReq(input);
    updateUserValue({ ...inputData, ...{ token: `${token}` } });
    // store token in local storage
    localStorage.setItem("accountToken", `${token}`);
  };

  const updateCustomerAddress = async (inputData, addressID, addressKey) => {
    const input = {
      address: inputData,
      customerAccessToken: `${userInfo.token}`,
      id: `${addressID}`,
    };

    let newAddress = await updateCustomerAddressReq(input);

    const updatedObject = { ...userInfo };

    updatedObject.addresses.edges[addressKey] = { node: newAddress };

    setUserInfo((userInfo) => ({
      ...userInfo,
      userInfo: updatedObject,
    }));
  };

  const deleteCustomerAddress = async (addressID, addressKey) => {
    const input = {
      customerAccessToken: `${userInfo.token}`,
      id: `${addressID}`,
    };

    let newAddress = await deleteCustomerAddressReq(input);

    const updatedObject = { ...userInfo };

    updatedObject.addresses.edges.splice(addressKey, 1);

    sendUserRequest();
  };

  const getUuid = async () => {};

  const updateWishlistItem = async (request) => {
    // console.log(wishlistIds);
    let update = await wishlistItemUpdate(
      localStorage.wishlistSessionid,
      localStorage.wishlistRegid,
      localStorage.wishlistId,
      request
    ).then(() => {});
    getWishlistItemsInfo();
  };

  const getUserWishlistRegid = async () => {
    const regIdData = await getRegId("headlessSite", userInfo.email);
    localStorage.setItem("wishlistRegid", regIdData.regid);
    localStorage.setItem("wishlistSessionid", regIdData.sessionid);
  };
  const getGuestWishlistRegid = async () => {
    const regIdData = await getRegId(
      "headlessSite",
      null,
      localStorage.wishlistUuid
    );
    localStorage.setItem("wishlistRegid", regIdData.regid);
    localStorage.setItem("wishlistSessionid", regIdData.sessionid);
  };
  const getWishlistIds = async () => {
    const wishlistsData = await getWishlists(
      localStorage.wishlistRegid,
      localStorage.wishlistSessionid
    );
    localStorage.setItem("wishlistId", wishlistsData.data[0].lid);
  };
  const getWishlistItemsInfo = async () => {
    const wishlistItemData = await getWishlistItems(
      localStorage.wishlistSessionid,
      localStorage.wishlistRegid,
      localStorage.wishlistId
    );

    // console.log(wishlistItemData);
    let itemsArray = [];
    for (let item of wishlistItemData.items) {
      itemsArray.push(item.empi);
    }
    updateUserValue({
      wishlist: {
        status: true,
        lineItems: wishlistItemData.items,
        lineItemIds: itemsArray,
      },
    });
  };

  const loginToWishlist = async () => {
    if (userInfo.loginStatus) {
      if (
        localStorage.wishlistRegid &&
        localStorage.wishlistId &&
        localStorage.wishlistSessionid
      ) {
        console.log("Just fetching wishlist items");
        getWishlistItemsInfo();
      } else if (localStorage.wishlistRegid && localStorage.wishlistSessionid) {
        console.log("Just fetching wishlist id and items");

        getWishlistIds().then(getWishlistItemsInfo);
      } else {
        console.log("Full login to wishlist");
        getUserWishlistRegid()
          .then(getWishlistIds())
          .then(getWishlistItemsInfo);
      }
      if (localStorage.tempWishlistItems) {
        console.log(
          localStorage.tempWishlistItems,
          `${localStorage.tempWishlistItems}`
        );
        updateWishlistItem({
          items: `${localStorage.tempWishlistItems}`,
          reqType: "a",
        });
      }
    } else {
      if (
        localStorage.wishlistRegid &&
        localStorage.wishlistId &&
        localStorage.wishlistSessionid
      ) {
        // console.log("Just fetching wishlist items");
        // getWishlistItemsInfo();
      } else if (localStorage.wishlistRegid && localStorage.wishlistSessionid) {
        // console.log("Just fetching wishlist id and items");
        // getWishlistIds().then(getWishlistItemsInfo);
      } else {
        // console.log("Full login to wishlist");
        getGuestWishlistRegid();
        // .then(getWishlistIds())
        // .then(getWishlistItemsInfo);
      }
      if (localStorage.tempWishlistItems) {
        console.log(JSON.parse(localStorage.tempWishlistItems));
        let itemsArray = [];
        for (let item of JSON.parse(localStorage.tempWishlistItems).wishlist
          .lineItems) {
          itemsArray.push(item.id);
        }
        updateUserValue(JSON.parse(localStorage.tempWishlistItems));
      }
    }

    // create new functions for guest users
  };

  const logout = async () => {
    console.log("logged out");
    localStorage.removeItem("accountToken");
    localStorage.removeItem("wishlistId");
    localStorage.removeItem("wishlistRegid");
    localStorage.removeItem("wishlistSessionid");

    setUserInfo({
      userType: "",
      firstName: "",
      lastName: "",
      listerCode: "",
      email: "",
      password: "",
      errorMessage: "",
      loginStatus: false,
      uuid: "",
      token: "",
      checkingLogin: true,
      successMessage: "",
      orderHistory: [],
      wishlist: {
        regid: "",
      },
    });
  };

  useEffect(() => {
    checkLoginStatus().then(() => {
      loginToWishlist();
    });
    // .then(() => {
    //   updateUserValue({ checkingLogin: false });
    // });
  }, [userInfo.email, localStorage]);

  return (
    <AccountContext.Provider
      value={{
        userInfo,
        setUserInfo,
        getUserInfo,
        sendUserRequest,
        sendRecoveryRequest,
        updateUserValue,
        updateCustomer,
        updateCustomerAddress,
        deleteCustomerAddress,
        updateWishlistItem,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

const AccountConsumer = AccountContext.Consumer;

export { AccountConsumer, AccountContext };
