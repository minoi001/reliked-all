import { createContext, useState } from "react";
import {
  deleteCustomerAddressReq,
  getUserAccessToken,
  getUserInfo,
  recoverUserAccount,
  updateCustomerAddressReq,
  updateCustomerReq,
} from "../lib/shopify";

import {
  getRegId,
  getWishlistItems,
  getWishlists,
  updateSwymWishlist,
} from "../lib/swym";

const AccountContext = createContext();

export default function AccountProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    userType: "",
    customerId: "",
    firstName: "",
    lastName: "",
    listerCode: "",
    email: "",
    password: "",
    errorMessage: "",
    loginStatus: false,
    uuid: "",
    token: "",
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
      giftCardId: "",
      giftCardBalance: 0,
    },
  });

  async function loginUser() {
    let authData = await getUserAccessToken(userInfo.email, userInfo.password);
    if (authData?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      localStorage.setItem(
        "accountToken",
        authData.customerAccessTokenCreate.customerAccessToken.accessToken
      );
      await retrieveUser();
    } else {
      updateUserValue({
        errorMessage:
          "We couldn't log you in with those details, please try again or reset your password.",
        loginStatus: false,
      });
    }
  }

  function updateUserValue(valuesObject) {
    setUserInfo({ ...userInfo, ...valuesObject });
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

    await deleteCustomerAddressReq(input);

    const updatedObject = { ...userInfo };

    updatedObject.addresses.edges.splice(addressKey, 1);

    await retrieveUser();
  };

  const intialiseUserRewardsScheme = async () => {};

  const updateWishlistItem = async (request) => {
    await updateSwymWishlist(
      localStorage.wishlistSessionid,
      localStorage.wishlistRegid,
      localStorage.wishlistId,
      request
    );
    await getWishlistItemsInfo();
  };

  const getWishlistItemsInfo = async () => {
    const wishlistItemData = await getWishlistItems(
      localStorage.wishlistSessionid,
      localStorage.wishlistRegid,
      localStorage.wishlistId
    );

    updateUserValue({
      wishlist: {
        status: true,
        lineItems: wishlistItemData.items,
        lineItemIds: wishlistItemData.items?.map((item) => item.empi),
      },
    });
  };

  const loginToWishlist = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (userInfo.email) {
      const regIdData = await getRegId("headless", userInfo.email);
      localStorage.setItem("wishlistRegid", regIdData.regid);
      localStorage.setItem("wishlistSessionid", regIdData.sessionid);
    } else {
      const regIdData = await getRegId(
        "headlessSite",
        null,
        localStorage.wishlistUuid
      );
      localStorage.setItem("wishlistRegid", regIdData.regid);
      localStorage.setItem("wishlistSessionid", regIdData.sessionid);
    }

    const wishlistsData = await getWishlists(
      localStorage.wishlistRegid,
      localStorage.wishlistSessionid
    );
    localStorage.setItem("wishlistId", wishlistsData.data[0].lid);

    await getWishlistItemsInfo();
  };

  // create new functions for guest users

  const logout = async () => {
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
      successMessage: "",
      orderHistory: [],
      wishlist: {
        regid: "",
      },
    });
  };

  async function retrieveUser() {
    if (!localStorage.accountToken) {
      console.error("No token found");
    }

    const { customer } = await getUserInfo(localStorage.accountToken);

    // if token value, set user info values
    if (customer != null) {
      updateUserValue({
        firstName: `${customer.firstName}`,
        lastName: `${customer.lastName}`,
        email: `${customer.email}`,
        phone: `${customer.phone}`,
        userType: `${customer.userType.value}`,
        listerCode: `${customer.userCode.value}`,
        loginStatus: true,
        errorMessage: null,
        addresses: customer.addresses,
        token: localStorage.accountToken,
        orderHistory: customer.orders.edges,
        rewardsScheme: {
          active: customer.rewardScheme?.value,
          points: customer.rewardPoints?.value,
        },
      });
      // Get and store the wishlist info
      // await loginToWishlist();
    } else {
      // token invalid, set error message and login status to false
      updateUserValue({
        errorMessage: "Your session has expired, please login again.",
        loginStatus: false,
      });
      localStorage.removeItem("accountToken");
    }
  }

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
