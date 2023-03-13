import { createContext, useState, useEffect } from "react";
import { getUserInfo } from "../lib/shopify";

const AccountContext = createContext();

export default function AccountProvider({ children }) {
  function sendUserRequest() {
    let email = "office@reliked.com";
    let password = "acp1rvz!TUP7uka4ehn";
    getUserInfo(email, password);
  }
  const [userInfo, setUserInfo] = useState({
    userType: "",
    userName: "",
    listerCode: "",
    email: "",
    password: "",
    errorMessage: "",
    loginStatus: "",
  });

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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

const AccountConsumer = AccountContext.Consumer;

export { AccountConsumer, AccountContext };
