import { PHASE_PRODUCTION_SERVER } from 'next/dist/shared/lib/constants';
import React from 'react';
import ProductCard from '../Products/ProductCard';
import { Hits } from 'react-instantsearch-dom';

const ProductList = ({ products }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">New In</h2>
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
          <Hits hitComponent={ProductCard} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
