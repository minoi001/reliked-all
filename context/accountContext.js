import { createContext, useState, useEffect } from "react";
import { getUserAccessToken, getUserInfo } from "../lib/shopify";

const AccountContext = createContext();

export default function AccountProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    userType: "",
    userName: "",
    listerCode: "",
    email: "office@reliked.com",
    password: "acp1rvz!TUP7uka4ehn",
    errorMessage: "",
    loginStatus: false,
    token: "",
  });

  function updateUserValue(
    value,
    label,
    value1,
    label1,
    value2,
    label2,
    value3,
    label3
  ) {
    userInfo[label] = value;
    userInfo[label1] = value1;
    userInfo[label2] = value2;
    userInfo[label3] = value3;
    return value;
  }

  async function sendUserRequest() {
    // send API req for token
    const tokenRequest = await getUserAccessToken(
      userInfo.email,
      userInfo.password
    );
    // if credentials fail to produce token, set error message and login status to false
    if (!tokenRequest.customerAccessTokenCreate.customerAccessToken) {
      updateUserValue(
        "we couldn't log you in with those details",
        "errorMessage",
        false,
        "loginStatus"
      );
      // if token, update user info with token
    } else {
      updateUserValue(
        `${tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken}`,
        "token"
      );
      // request user info using token
      const infoRequest = await getUserInfo(
        tokenRequest.customerAccessTokenCreate.customerAccessToken.accessToken
      );
      // if token value, set user info values
      if (infoRequest.customer) {
        updateUserValue(
          `${infoRequest.customer.firstName} ${infoRequest.customer.lastName}`,
          "userName",
          `${infoRequest.customer.userType.value}`,
          "userType",
          `${infoRequest.customer.userCode.value}`,
          "listerCode",
          true,
          "loginStatus"
        );
        // token invalid, set error message and login status to false
      } else {
        updateUserValue(
          "your session has expired, please login again",
          "errorMessage",
          false,
          "loginStatus"
        );
      }
    }
  }

  // useEffect(() => {
  //   sendUserRequest();
  // }, []);

  return (
    <AccountContext.Provider
      value={{
        userInfo,
        setUserInfo,
        getUserInfo,
        sendUserRequest,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

const AccountConsumer = AccountContext.Consumer;

export { AccountConsumer, AccountContext };
