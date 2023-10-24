import { createContext, useState, useEffect } from "react";
import {
  getUserAccessToken,
  getUserInfo,
  recoverUserAccount,
  updateCustomerReq,
  updateCustomerAddressReq,
  deleteCustomerAddressReq,
} from "../lib/shopify";

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
    token: "",
    checkingLogin: true,
    successMessage: "",
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
        });
        // store token in local storage
        localStorage.setItem(
          "accountToken",
          `${tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken}`
        );
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

    setUserInfo((userInfo) => ({
      ...userInfo,
      userInfo: updatedObject,
    }));
  };

  const logout = async () => {
    localStorage.removeItem("accountToken");

    setUserInfo({
      userType: "",
      firstName: "",
      lastName: "",
      listerCode: "",
      email: "",
      password: "",
      errorMessage: "",
      loginStatus: false,
      token: "",
      checkingLogin: false,
    });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

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
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

const AccountConsumer = AccountContext.Consumer;

export { AccountConsumer, AccountContext };
