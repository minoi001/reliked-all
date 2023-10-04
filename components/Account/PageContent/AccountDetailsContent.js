import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";
import { PencilIcon } from "@heroicons/react/24/outline";
export default function AccountDetailsContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="block">
      <h1 className="font-h text-3xl text-center pt-6">Details</h1>
      <div className="grid grid-cols-2 mt-4">
        <div className="col-span-1">
          <div className="grid grid-cols-2 items-center">
            <div className="col-span-1 uppercase text-sm ">
              <p>Name</p>
            </div>
            <div className="col-span-1">
              <p>
                {userInfo.userName}{" "}
                <button>
                  <PencilIcon
                    className="h-3 w-3 text-almostBlack group-hover:text-taupe"
                    aria-hidden="true"
                  />
                </button>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="col-span-1 uppercase text-sm ">
              <p>Email</p>
            </div>
            <div className="col-span-1">
              <p>
                {userInfo.email}{" "}
                <button>
                  <PencilIcon
                    className="h-3 w-3 text-almostBlack group-hover:text-taupe"
                    aria-hidden="true"
                  />
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 flex-row">
            <div className="col-span-1 uppercase text-sm">Password</div>
            <div className="col-span-1">
              ********{" "}
              <button>
                <PencilIcon
                  className="h-3 w-3 text-almostBlack group-hover:text-taupe"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 flex-row">
            <div className="col-span-1 uppercase text-sm">Phone</div>
            <div className="col-span-1">
              {userInfo.phone}
              <button>
                <PencilIcon
                  className="h-3 w-3 text-almostBlack group-hover:text-taupe"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="uppercase text-sm mt-4 text-center">Addresses</p>
      <div className="grid grid-cols-4 mt-4">
        {userInfo.addresses.edges.map((address, i) => {
          return (
            <p className="m-2" key={i}>
              {address.node.formatted.map((line, ind) => {
                return <p key={ind}>{line}</p>;
              })}
            </p>
          );
        })}
      </div>
      {/* <p className="md:px-24 font-h text-lg">Happy Shopping!</p>
      <p className="p-2 md:px-24 font-h text-lg">Reliked x</p> */}
    </div>
  );
}
