import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
export default function AccountHomeContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="text-center ">
      <h1 className="font-h text-3xl text-center pt-6">
        Hi {userInfo.firstName}
      </h1>
      <p className="p-6 md:px-24">
        Welcome to your Reliked account summary, where you can view and update
        your personal details, access your order history, check your rewards
        status and browse your wishlist. Use the account menu to navigate these
        pages.
      </p>
      <p className="md:px-24 font-h text-lg">Happy Shopping!</p>
      <p className="p-2 md:px-24 font-h text-lg">Reliked x</p>
    </div>
  );
}
