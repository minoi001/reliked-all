import ProductCard from '../Products/ProductCard';
import { Hits } from 'react-instantsearch-dom';

const ProductList = () => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">New In</h2>
        <Hits hitComponent={ProductCard} />
      </div>
    </div>
  );
};

export default ProductList;
