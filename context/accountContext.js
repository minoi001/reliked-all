import { createContext, useState, useEffect } from "react";
import { getUserAccessToken, getUserInfo } from "../lib/shopify";

const AccountContext = createContext();

export default function AccountProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    userType: "",
    userName: "",
    listerCode: "",
    email: "",
    password: "",
    errorMessage: "",
    loginStatus: false,
    token: "",
  });

  function updateUserValue(valuesObject) {
    // console.log(valuesObject);
    setUserInfo({ ...userInfo, ...valuesObject });

    // for (let value in valuesObject) {
    //   console.log(valuesObject[value]);
    // }

    return valuesObject;
  }

  const checkLoginStatus = () => {
    if (localStorage.accountToken) {
      getUserInfo(localStorage.accountToken);
    }
  };

  async function sendUserRequest(event) {
    if (event) {
      event.preventDefault();
    }
    // send API req for token
    const tokenRequest = await getUserAccessToken(
      userInfo.email,
      userInfo.password
    );
    // if credentials fail to produce token, set error message and login status to false
    if (!tokenRequest.customerAccessTokenCreate.customerAccessToken) {
      updateUserValue({
        errorMessage: "we couldn't log you in with those details",
        false: "errorMessage",
      });
      // if token, update user info with token
    } else {
      updateUserValue({
        token: `${tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken}`,
      });
      // request user info using token
      const infoRequest = await getUserInfo(
        tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken
      );
      // if token value, set user info values
      if (infoRequest.customer) {
        updateUserValue({
          userName: `${infoRequest.customer.firstName} ${infoRequest.customer.lastName}`,
          userType: `${infoRequest.customer.userType.value}`,
          listerCode: `${infoRequest.customer.userCode.value}`,
          loginStatus: true,
        });
        // token invalid, set error message and login status to false
      } else {
        updateUserValue({
          errorMessage: "your session has expired, please login again",
          loginStatus: false,
        });
      }
    }
  }

  useEffect(() => {
    sendUserRequest();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        userInfo,
        setUserInfo,
        getUserInfo,
        sendUserRequest,
        updateUserValue,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

const AccountConsumer = AccountContext.Consumer;

export { AccountConsumer, AccountContext };
