import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PopUp({ open, setOpen, content }) {
  let [inputData, setInputData] = useState([]);
  let [loadComponent, setLoadComponent] = useState(false);
  const cancelButtonRef = useRef(null);

  function handleInput(label, value) {
    // setInputData([...inputData, { [label]: value }]);

    const newInput = { label: label, value: value };

    const updatedInputs = inputData.map((item) => {
      if (item.label === newInput.label) {
        return newInput;
      }
      return item;
    });

    if (!updatedInputs.some((item) => item.label === newInput.label)) {
      updatedInputs.push(newInput);
    }

    setInputData(updatedInputs);
  }

  function handleUpdate(values) {
    setOpen(false);
  }
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cream sm:mx-0 sm:h-10 sm:w-10">
                      <PencilIcon
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
                      <div className="mt-2">
                        <form className="" action="#" method="POST">
                          <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                          />
                          <div className="bg-white px-4 py-3 sm:flex sm:px-0">
                            {content && content.fields
                              ? content.fields.map((field) => (
                                  <div
                                    key={field.label}
                                    className="inline-flex p-1"
                                  >
                                    <label
                                      htmlFor={field.label}
                                      className="sr-only"
                                    >
                                      {field.title}
                                    </label>
                                    <input
                                      id={field.label}
                                      name={field.label}
                                      type="text"
                                      autoComplete={field.label}
                                      required
                                      className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-taupe sm:text-sm sm:leading-6"
                                      placeholder={field.title}
                                      onChange={(event) =>
                                        handleInput(
                                          field.label,
                                          event.target.value
                                        )
                                      }
                                    />
                                  </div>
                                ))
                              : ""}
                          </div>
                          <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-mint px-3 py-2 text-sm font-semibold text-almostBlack shadow-sm hover:bg-almostBlack hover:text-white sm:ml-3 sm:w-auto"
                              onSubmit={handleUpdate}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
