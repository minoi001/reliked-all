import React, { useContext } from "react";
import Select from "react-select";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Ownership = ({ styles }) => {
  const { productInfo, updateProductValue, listingVariables } =
    useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  const influencers = listingVariables.influencers;

  const anonymous = [
    {
      value: true,
      label: "Anonymous",
      variable: "anonymous",
    },
    {
      value: false,
      label: "Public",
      variable: "anonymous",
    },
  ];

  const handleChange = (event) => {
    updateProductValue({ [event.variable]: event.value });
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe ">
        <legend className="p-1">{"OWNERSHIP"}</legend>
        <div className="flex">
          <Select
            className="mb-4 p-2 inline w-2/3"
            id="influencer"
            type="text"
            options={influencers}
            placeholder="Influencer"
            onChange={handleChange}
            styles={styles}
          />
          {/* <input className="mb-4 p-2 inline w-2/3" placeholder={"Influencer"} /> */}
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <Select
            className="mb-4 p-2 inline w-1/3"
            id="anonymous"
            type="text"
            options={anonymous}
            placeholder="Anonymity"
            onChange={handleChange}
            styles={styles}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Ownership;
