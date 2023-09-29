import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";

export default function AccountPageContent() {
  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    sendUserRequest,
    updateUserValue,
  } = useContext(AccountContext);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="md:px-12 align-middle p-2 py-2 w-full bg-white shadow-lg">
        <div className="md:grid md:grid-cols-5 p-4">
          <div className="col-span-1">
            <p className={`m-1 font-medium text-sm uppercase px-4 py-2.5 pt-6`}>
              Account Menu
            </p>
            <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
              Personal Details
            </p>
            <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
              Orders
            </p>
            <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
              Rewards
            </p>
            <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
              Wishlist
            </p>
          </div>
          <div className="col-span-4 text-center">
            <div className="text-center">
              <h1 className="font-h text-3xl text-center pt-6">
                Hi {userInfo.firstName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
