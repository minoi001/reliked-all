import { Fragment, useEffect, useRef, useState, useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function WarningPopUp({ open, setOpen, content }) {
  const { deleteCustomerAddress } = useContext(AccountContext);

  // need to set error message to blank on load
  let [inputData, setInputData] = useState({});
  let [errorMessage, setErrorMessage] = useState("");
  let [newInputData, setNewInputData] = useState({});

  const cancelButtonRef = useRef(null);

  const handleUpdate = async (event, functionName) => {
    event.preventDefault();
    console.log(content.id);
    deleteCustomerAddress(content.id, content.i);
    setErrorMessage("");
    setInputData([]);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cream sm:mx-0 sm:h-10 sm:w-10">
                      <XMarkIcon
                        className="h-6 w-6 text-taupe"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {content ? content.title : ""}
                      </Dialog.Title>
                      <p>{errorMessage} </p>
                      <div className="mt-2">
                        <form
                          className=""
                          action="#"
                          method="POST"
                          onSubmit={(event) =>
                            handleUpdate(
                              event,
                              content.functionName,
                              content.id,
                              content.i
                            )
                          }
                        >
                          <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center bg-rose px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-almostBlack hover:text-white sm:ml-3 sm:w-auto"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
