import Image from "next/image";
import Login from "../Account/Login";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { ProductContext } from "../../context/productContext";
import { AccountContext } from "../../context/accountContext";
import Title from "./ListingVariables/Title";
import Type from "./ListingVariables/Type";
import Audience from "./ListingVariables/Audience";
import Ownership from "./ListingVariables/Ownership";
import Photos from "./ListingVariables/Photos";
import Details from "./ListingVariables/Details";
import Staff from "./ListingVariables/Staff";
import Price from "./ListingVariables/Price";
import * as LR from "@uploadcare/blocks";
import st from "../../styles/App.module.css";
import { PACKAGE_VERSION } from "@uploadcare/blocks/env";

export default function NewListing({ listing }) {
  const { productInfo, resetProductInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  LR.registerBlocks(LR);

  const dataOutputRef = useRef();
  // TODO: We need to export all data output types
  const [files, setFiles] = useState([]);

  // TODO: We need to export all the event types
  const handleUploaderEvent = useCallback((e) => {
    const { data } = e.detail;
    setFiles(data);
  }, []);

  useEffect(() => {
    const el = dataOutputRef.current;

    // TODO: Augment global custom event types
    el?.addEventListener("lr-data-output", handleUploaderEvent);
    return () => {
      el?.removeEventListener("lr-data-output", handleUploaderEvent);
    };
  }, [handleUploaderEvent]);

  const styles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none",
      borderRadius: 0,
      borderColor: "#EFE8DF",
      color: "black",
      "&:hover": {
        border: "1px solid #A8918D",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: 0,
      borderColor: "#A8918D",
      ":active": {
        ...provided[":active"],
        borderColor: "white",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isSelected || state.isFocused ? "#EFE8DF" : "#ffffff",

      color: "black",
      borderRadius: 0,
      borderColor: "#A8918D",
      ":active": {
        ...provided[":active"],
        backgroundColor: !state.isDisabled ? "#A8918D" : undefined,
        color: "white",
      },
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    myDropDown__indicator: (base) => ({
      ...base,
      "&.myDropDown__dropdown-indicator": {
        "&.indicatorContainer": {
          color: "#000000",
        },
      },
    }),
    "&.indicatorContainer": {
      color: "#000000",
    },
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isActive ? "#A8918D" : "#EFE8DF", // Custom colour
      "&:hover": {
        color: "#A8918D",
      },
    }),
  };

  useEffect(() => {
    // console.log("refresh");
    resetProductInfo();
  }, []);

  return (
    <div
      className={
        st.wrapper +
        "flex flex-col justify-center items-center -mt-6 sm:-mt-16 md:flex-row md:items-start md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto"
      }
    >
      {userInfo.loginStatus ? (
        //  logged in
        <div>
          <div className="bg-white pb-4">
            <div>
              <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-extrabold text-almostBlack mb-0 ">
                  {/* {productInfo.title} */}
                  <center>Add Listing</center>
                </h1>
                <div className={"grid" + st.output}>
                  {files.map((file) => (
                    <div className="inline-flex p-1 w-1/4 h-36" key={file.uuid}>
                      <Image
                        className="object-contain p-1"
                        key={file.uuid}
                        src={`https://ucarecdn.com/${file.uuid}/${
                          file.cdnUrlModifiers || ""
                        }`}
                        width="400"
                        height="500"
                        alt="Preview"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2">
              {/* LEFT SIDE OF FORM */}
              <div className="inline w-full p-4 pt-0 md:pl-8">
                <div
                  className={
                    userInfo.userType === "Customer" ||
                    userInfo.userType === "Influencer"
                      ? "hidden "
                      : ""
                  }
                >
                  <Ownership styles={styles} />

                  <Type styles={styles} />

                  <Audience styles={styles} />

                  <Title styles={styles} />
                </div>
              </div>
              {/* RIGHT SIDE OF FORM */}

              <div className="inline w-full p-4 pt-0 md:pr-8">
                <fieldset className="px-4 border-solid border-2 border-taupe w-full">
                  <legend className="p-1">PHOTOS</legend>
                  <Photos styles={styles} />
                  <div>
                    <lr-file-uploader-regular
                      class={"uploadcare-settings " + st.uploaderCfg}
                      css-src={`https://unpkg.com/@uploadcare/blocks@${PACKAGE_VERSION}/web/file-uploader-regular.min.css`}
                    >
                      <lr-data-output
                        ref={dataOutputRef}
                        use-event
                        hidden
                        class={st.uploaderCfg}
                        onEvent={handleUploaderEvent}
                      ></lr-data-output>
                    </lr-file-uploader-regular>
                  </div>
                </fieldset>
                <Details styles={styles} />

                <Price styles={styles} />
              </div>
            </div>
            <div
              className={
                userInfo.userType === "Customer" ||
                userInfo.userType === "Influencer"
                  ? "hidden "
                  : "flex-inline px-4 md:px-8 w-full"
              }
            >
              <Staff styles={styles} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md border bg-white overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-full w-full">
            <Login styles={styles} />
          </div>
        </div>
      )}
    </div>
  );
}
