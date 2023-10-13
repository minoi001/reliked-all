import { useContext, useState } from "react";
import { AccountContext } from "../../../context/accountContext";
import { PencilIcon } from "@heroicons/react/24/outline";
import PopUp from "../../PopUp";

export default function AccountDetailsContent() {
  const { userInfo } = useContext(AccountContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState();

  function editButton(content) {
    setPopupContent(content);
    setPopupOpen(true);
  }

  return (
    <div className="block ml-12">
      <h1 className="font-h text-3xl text-center pt-6">Details</h1>
      <div className="grid grid-cols-2 mt-4">
        <div className="col-span-1">
          <div className="grid grid-cols-2 items-center">
            <div className="col-span-1 uppercase text-sm ">
              <p>Name</p>
            </div>
            <div className="col-span-1">
              <div>
                {userInfo.userName}{" "}
                <button
                  onClick={(event) =>
                    editButton({
                      type: "userName",
                      title: "Edit your name",
                      functionName: "updateUserName",
                      fields: [
                        {
                          label: "firstName",
                          title: "First Name",
                          type: "text",
                        },
                        {
                          label: "lastName",
                          title: "Last Name",
                          type: "text",
                        },
                      ],
                    })
                  }
                >
                  <PencilIcon
                    className="h-3 w-3 text-almostBlack group-hover:text-taupe"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="col-span-1 uppercase text-sm ">
              <p>Email</p>
            </div>
            <div className="col-span-1">
              <div>
                {userInfo.email}{" "}
                <button
                  onClick={(event) =>
                    editButton({
                      type: "email",
                      title: "Edit your email address",
                      functionName: "updateEmail",
                      fields: [
                        {
                          label: "email",
                          title: "Email",
                          type: "email",
                        },
                      ],
                    })
                  }
                >
                  <PencilIcon
                    className="h-3 w-3 text-almostBlack group-hover:text-taupe"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 flex-row">
            <div className="col-span-1 uppercase text-sm">Password</div>
            <div className="col-span-1">
              ********{" "}
              <button
                onClick={(event) =>
                  editButton({
                    type: "password",
                    title: "Edit your password",
                    functionName: "updatePassword",
                    fields: [
                      {
                        label: "password",
                        title: "Password",
                        type: "password",
                      },
                      {
                        label: "confirmPassword",
                        title: "Confirm Password",
                        type: "password",
                      },
                    ],
                  })
                }
              >
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
      <p className="uppercase text-sm mt-12 text-center">Addresses</p>
      <div className="grid grid-cols-4 mt-2">
        {userInfo.addresses.edges.map((address, i) => {
          return (
            <div className="m-2" key={i}>
              {address.node.formatted.map((line, ind) => {
                return (
                  <div key={ind}>
                    <p key={ind}>{line}</p>
                  </div>
                );
              })}
              <div className="inline bg-cream p-1 text-xs uppercase">
                <button className="inline">
                  Edit{" "}
                  <PencilIcon
                    className="h-3 w-3 text-almostBlack group-hover:text-taupe inline"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <PopUp open={popupOpen} setOpen={setPopupOpen} content={popupContent} />
      {/* <p className="md:px-24 font-h text-lg">Happy Shopping!</p>
      <p className="p-2 md:px-24 font-h text-lg">Reliked x</p> */}
    </div>
  );
}
