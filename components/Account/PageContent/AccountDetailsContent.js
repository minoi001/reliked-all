import { useContext, useState } from "react";
import { AccountContext } from "../../../context/accountContext";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import EditPopUp from "../../EditPopUp";
import WarningPopUp from "../../WarningPopUp";

export default function AccountDetailsContent() {
  const { userInfo } = useContext(AccountContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState();
  const [wPopupOpen, setWPopupOpen] = useState(false);
  const [wPopupContent, setWPopupContent] = useState();
  function editButton(content) {
    setPopupContent(content);
    setPopupOpen(true);
  }

  function deleteButton(content) {
    setWPopupContent(content);
    setWPopupOpen(true);
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
                {userInfo.firstName} {userInfo.lastName}
                <button
                  onClick={(event) =>
                    editButton({
                      type: "userName",
                      title: "Edit your name",
                      functionName: "updateCustomer",
                      confirm: false,
                      pattern: null,
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
                      functionName: "updateCustomer",
                      confirm: true,
                      pattern: null,
                      fields: [
                        {
                          label: "email",
                          title: "Email",
                          type: "email",
                          required: true,
                        },
                        {
                          label: "confirmEmail",
                          title: "Confirm Email",
                          type: "email",
                          required: true,
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
                    functionName: "updateCustomer",
                    confirm: true,
                    pattern: null,
                    fields: [
                      {
                        label: "password",
                        title: "Password",
                        type: "password",
                        required: true,
                      },
                      {
                        label: "confirmPassword",
                        title: "Confirm Password",
                        type: "password",
                        required: true,
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
              <button
                onClick={(event) =>
                  editButton({
                    type: "phone",
                    title: "Phone Number",
                    functionName: "updateCustomer",
                    confirm: true,
                    fields: [
                      {
                        label: "phone",
                        title: "Phone Number",
                        type: "tel",
                        pattern: "[0-9]{11}",
                        patternMessage: "Please enter a valid phone number",
                        required: true,
                      },
                      {
                        label: "confirmPhone",
                        title: "Confirm Phone No.",
                        type: "tel",
                        pattern: "[0-9]{11}",
                        patternMessage: "Please enter a valid phone number",
                        required: true,
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
              <div className="inline bg-cream p-1 text-xs uppercase mx-1">
                <button
                  className="inline"
                  onClick={(event) =>
                    editButton({
                      id: address.node.id,
                      i: i,
                      type: "address",
                      title: "Edit your address",
                      functionName: "updateCustomerAddress",
                      confirm: false,
                      pattern: null,
                      fields: [
                        {
                          label: "firstName",
                          title: "First Name",
                          type: "firstName",
                          pattern: null,
                          required: true,
                        },
                        {
                          label: "lastName",
                          title: "Last Name",
                          type: "lastName",
                          pattern: null,
                          required: true,
                        },
                        {
                          label: "company",
                          title: "Company",
                          type: "company",
                          pattern: null,
                          required: false,
                        },
                        {
                          label: "phone",
                          title: "Phone",
                          type: "phone",
                          pattern: null,
                          required: false,
                        },
                        {
                          label: "address1",
                          title: "Line 1",
                          type: "address1",
                          pattern: null,
                          required: true,
                        },
                        {
                          label: "address2",
                          title: "Line 2",
                          type: "address2",
                          pattern: null,
                          required: false,
                        },
                        {
                          label: "city",
                          title: "City",
                          type: "city",
                          pattern: null,
                          required: true,
                        },

                        {
                          label: "country",
                          title: "Country",
                          type: "country",
                          pattern: null,
                          required: true,
                        },

                        {
                          label: "province",
                          title: "County/Province",
                          type: "province",
                          pattern: null,
                          required: true,
                        },
                        {
                          label: "zip",
                          title: "Post Code",
                          type: "zip",
                          pattern: null,
                          required: true,
                        },
                      ],
                    })
                  }
                >
                  Edit{" "}
                  <PencilIcon
                    className="h-3 w-3 text-almostBlack group-hover:text-taupe inline"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="inline bg-taupe p-1 text-xs uppercase mx-1 text-white">
                <button
                  className="inline"
                  onClick={(event) =>
                    deleteButton({
                      id: address.node.id,
                      i: i,
                      type: "address",
                      title: "Are you sure you want to delete this address?",
                      functionName: "deleteCustomerAddress",
                      confirm: false,
                      pattern: null,
                    })
                  }
                >
                  Delete{" "}
                  <XMarkIcon
                    className="h-3 w-3 text-white group-hover:text-taupe inline"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <EditPopUp
        open={popupOpen}
        setOpen={setPopupOpen}
        content={popupContent}
      />
      <WarningPopUp
        open={wPopupOpen}
        setOpen={setWPopupOpen}
        content={wPopupContent}
      />

      {/* <p className="md:px-24 font-h text-lg">Happy Shopping!</p>
      <p className="p-2 md:px-24 font-h text-lg">Reliked x</p> */}
    </div>
  );
}
