import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";
export default function AccountDetailsContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="text-center ">
      <h1 className="font-h text-3xl text-center pt-6">Details</h1>
      <p className="p-6 md:px-24 h-96"></p>
      {/* <p className="md:px-24 font-h text-lg">Happy Shopping!</p>
      <p className="p-2 md:px-24 font-h text-lg">Reliked x</p> */}
    </div>
  );
}
