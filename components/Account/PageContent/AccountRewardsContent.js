import { useContext, useState } from "react";
import { AccountContext } from "../../../context/accountContext";
import { createGiftCard } from "../../../lib/relikedAPI";
export default function AccountRewardsContent() {
  const { userInfo, updateUserValue } = useContext(AccountContext);
  const [rewardsSchemeStatus, setRewardsSchemeStatus] = useState(false);

  const initialise = async () => {
    let giftCardData = await createGiftCard({
      input: {
        initialValue: 0.0,
        customerId: userInfo.customerId,
        note: `This is the rewards points gift card for ${userInfo.email}`,
      },
    });
    console.log(giftCardData);
    // updateUserValue(giftCardData)
  };

  return (
    <div className="text-center ">
      <h1 className="font-h text-3xl text-center pt-6">Rewards</h1>
      {rewardsSchemeStatus ? (
        <div>
          {userInfo.rewardsScheme.active ? (
            <div>
              <p className="p-4 text-xl">
                You have {userInfo.rewardsScheme.points} points to spend.
              </p>

              <p>
                Each point is worth 1p, so your points are worth £
                {userInfo.rewardsScheme.points / 100}.
              </p>
              {userInfo.rewardsScheme.giftCardId ? (
                <div className="inline-block">
                  <div className="inline-block">
                    <p className="p-4 text-xl font-h">Ready to spend? </p>
                    <button className="bg-taupe text-white p-2 px-4 font-bold">
                      Add points gift card
                    </button>
                  </div>
                  <div className="inline-block">
                    <p className="p-4 text-xl font-h">Gift Card Balance: </p>

                    <button className="bg-taupe text-white p-2 px-4 font-bold">
                      Spend £{userInfo.rewardsScheme.giftCardBalance}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="inline-block">
                  <p className="p-4 text-xl font-h">
                    Initialise Rewards Gift Card
                  </p>

                  <button
                    className="bg-taupe text-white p-2 px-4 font-bold"
                    onClick={initialise}
                  >
                    Get my gift card
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="p-2 font-h text-lg">Join our rewards scheme</p>
            </div>
          )}
        </div>
      ) : (
        <p className="p-4 text-xl">
          We are working on a new reward scheme, check back in future for
          updates!
        </p>
      )}
    </div>
  );
}
