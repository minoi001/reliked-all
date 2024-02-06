import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";
export default function AccountRewardsContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="text-center ">
      <h1 className="font-h text-3xl text-center pt-6">Rewards</h1>
      {userInfo.rewardsScheme.active ? (
        <div>
          <p className="p-4 text-xl">
            You have {userInfo.rewardsScheme.points} points to spend.
          </p>

          <p>
            Each point is worth 1p, so your points are worth £
            {userInfo.rewardsScheme.points / 100}.
          </p>

          <p className="p-4 text-xl font-h">Ready to spend? </p>

          <button className="bg-taupe text-white p-2 px-4 font-bold">
            Get gift card
          </button>
        </div>
      ) : (
        <div>
          <p className="p-2 font-h text-lg">Join our rewards scheme</p>
        </div>
      )}
    </div>
  );
}
