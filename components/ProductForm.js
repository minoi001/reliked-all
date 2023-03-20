import { useState, useContext } from "react";
import { formatter } from "../utils/helpers";
import ProductList from "./ProductList";
import ProductOptions from "./ProductOptions";
import { ShopContext } from "../context/shopContext";

export default function ProductForm({ product }) {
  const { addToCart, setCartOpen } = useContext(ShopContext);

  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};
    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: product.id,
      variantId: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image
        ? variant.node.image.url
        : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018",
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  return (
    <div className="p-4 shadow-lg flex flex-col w-full md:w-1/3 bg-white">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-6">
        {formatter.format(product.variants.edges[0].node.priceV2.amount)}
      </span>
      {product.options.map(({ name, values }) => (
        <ProductOptions
          key={`key-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      <button
        onClick={() => {
          addToCart(selectedVariant);
          setCartOpen(true);
        }}
        className="bg-rose text-white px-2 py-3 mt-4 hover:bg-gray-800"
      >
        Add to cart
      </button>
    </div>
  );
}
