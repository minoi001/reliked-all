import React, { useContext } from 'react';
import Select from 'react-select';

import { ProductContext } from '../../../context/productContext';
import { AccountContext } from '../../../context/accountContext';
const Type = ({ products }) => {
  const { productInfo, updateProductValue } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  const types = [
    {
      value: 'Shoes',
      label: 'Shoes',
      variable: 'type',
    },
    { value: 'Coat', label: 'Coat', variable: 'type' },
    {
      value: 'Dress',
      label: 'Dress',
      variable: 'type',
    },
  ];

  const handleChange = (event) => {
    console.log(event);
    updateProductValue({ [event.variable]: event.value });
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600 ">
        <legend className="p-1">TYPE</legend>
        <div className="flex">
          <Select
            className="mb-4 p-2 inline w-full"
            id="type"
            type="text"
            options={types}
            placeholder="What are you listing?"
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Type;
