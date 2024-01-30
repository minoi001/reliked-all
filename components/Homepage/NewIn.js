import ProductCard from "../Products/ProductCard";
import { getNewestProducts } from "../../algoliaConfig";
import { useEffect, useState } from "react";

const NewIn = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const products = await getNewestProducts();
      setData(products);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">New In</h2>
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          {data?.map((product) => {
            return <ProductCard hit={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default NewIn;
