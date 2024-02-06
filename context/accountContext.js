import { createContext, useState, useEffect, useCallback } from "react";
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
    addresses: [],
    wishlist: {
      status: false,
      lineItems: [],
      lineItemIds: [],
    },
    rewardsScheme: {
      active: false,
      points: 0,
    },
  });

  async function loginUser() {
    let authData = await getUserAccessToken(userInfo.email, userInfo.password);
    if (authData?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      localStorage.setItem(
        "accountToken",
        authData.customerAccessTokenCreate.customerAccessToken.accessToken
      );
      let userData = await retrieveUser();
      let wishlistData = await loginToWishlist();
    } else {
      updateUserValue({
        errorMessage:
          "We couldn't log you in with those details, please try again or reset your password.",
        loginStatus: false,
        checkingLogin: false,
      });
    }
  }

  function updateUserValue(valuesObject) {
    setUserInfo({ ...userInfo, ...valuesObject });
    return valuesObject;
  }

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

    retrieveUser();
  };

  const getUuid = async () => {};

  const intialiseUserRewardsScheme = async () => {};

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

  const getUserWishlistRegid = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const regIdData = await getRegId("headlessSite", userInfo.email);
    localStorage.setItem("wishlistRegid", regIdData.regid);
    localStorage.setItem("wishlistSessionid", regIdData.sessionid);
  };
  const getGuestWishlistRegid = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const regIdData = await getRegId(
      "headlessSite",
      null,
      localStorage.wishlistUuid
    );
    localStorage.setItem("wishlistRegid", regIdData.regid);
    localStorage.setItem("wishlistSessionid", regIdData.sessionid);
  };
  const getWishlistIds = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const wishlistsData = await getWishlists(
      localStorage.wishlistRegid,
      localStorage.wishlistSessionid
    );
    localStorage.setItem("wishlistId", wishlistsData.data[0].lid);
  };
  const getWishlistItemsInfo = async (event) => {
    if (event) {
      event.preventDefault();
    }
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

  const loginToWishlist = async (userInfo) => {
    // if (event) {
    //   event.preventDefault();
    // }
    // something in this is resetting the checkinglogin to true
    if (
      localStorage.wishlistRegid &&
      localStorage.wishlistId &&
      localStorage.wishlistSessionid
    ) {
      getWishlistItemsInfo();
    } else if (localStorage.wishlistRegid && localStorage.wishlistSessionid) {
      getWishlistIds().then(getWishlistItemsInfo);
    } else {
      getUserWishlistRegid().then(getWishlistIds()).then(getWishlistItemsInfo);
    }
    if (localStorage.tempWishlistItems) {
      let itemsArray = [];
      for (let item of JSON.parse(localStorage.tempWishlistItems).wishlist
        .lineItems) {
        itemsArray.push(
          `{"epi":${Number(item.objectID)},"empi":${Number(
            item.id
          )},"du":"https://e-bloggers.myshopify.com/${item.handle}"}`
        );
      }
      updateWishlistItem({
        type: "a",
        string: `[${itemsArray.join(",")}]`,
      });

      localStorage.removeItem("tempWishlistItems");
    }

    // create new functions for guest users
  };

  const logout = async () => {
    // console.log("logged out");
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
      checkingLogin: false,
      successMessage: "",
      orderHistory: [],
      wishlist: {
        regid: "",
      },
    });
  };

  async function retrieveUser(event) {
    // prevent page reload
    if (event) {
      event.preventDefault();
    }
    const infoRequest = await getUserInfo(localStorage.accountToken);
    console.log(infoRequest);
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
        rewardsScheme: {
          active: infoRequest.customer.rewardScheme.value,
          points: infoRequest.customer.rewardPoints.value,
        },
      });
      // loginToWishlist();
    } else {
      // token invalid, set error message and login status to false
      updateUserValue({
        errorMessage: "Your session has expired, please login again.",
        loginStatus: false,
        checkingLogin: false,
      });
      localStorage.removeItem("accountToken");
      // loginToWishlist();
    }
  }

  useEffect(() => {
    const userLogin = async (event) => {
      if (event) {
        event.preventDefault();
      }
      let userInfoData = await retrieveUser();
      // turning off wishlist until fix found
      // let wishlistData = await loginToWishlist();
    };
    // check if there is a valid token
    if (localStorage.accountToken) {
      // if there is, retrieve user info (including to wishlist)
      userLogin();
    } else {
      // if not, set checkingLogin status to false
      updateUserValue({ checkingLogin: false });
    }
  }, [localStorage.accountToken]);

  return (
    <AccountContext.Provider
      value={{
        userInfo,
        loginUser,
        setUserInfo,
        getUserInfo,
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
