import { useState, useContext } from "react";
import { formatter } from "../../utils/helpers";
import ProductList from "../Homepage/ProductList";
import ProductOptions from "./ProductOptions";
import { ShopContext } from "../../context/shopContext";
import Link from "next/link";
export default function ProductForm({ product }) {
  const {
    cartOpen,
    addToCart,
    setCartOpen,
    checkoutUrl,
    removeCartItem,
    clearCart,
    cartLoading,
    incrementCartItem,
    decrementCartItem,
  } = useContext(ShopContext);

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
  const [offerPrice, setOfferPrice] = useState();

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
  var stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-h">{product.title}</h2>
      <div
        className="pt-6 pb-4"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>
      <div className="sm:flex">
        {product.options.map(({ name, values }) => (
          <ProductOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
          />
        ))}
      </div>
      <div className="sm:flex">
        <ProductOptions
          key={`key-${product.condition.value}`}
          name={"Condition"}
          values={[product.condition.value]}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
        <ProductOptions
          key={`key-${product.packaging.value}`}
          name={"Packaging"}
          values={[product.packaging.value]}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
        {product.influencer ? (
          <div>
            {product.influencer.value == "Anonymous" ||
            product.influencer.value.includes("UNKN") ||
            product.influencer.value.includes("Profit") ||
            product.influencer.value.includes("EBLO") ||
            product.influencer.value.includes("RELI") ||
            product.type.includes("Beauty") ? (
              ""
            ) : (
              <ProductOptions
                key={`key-${product.influencer.value}`}
                name={"Influencer"}
                values={[product.influencer.value]}
                selectedOptions={selectedOptions}
                setOptions={setOptions}
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* can't align text bottom */}
      <div className="inline-flex w-full items-center mt-4 align-text-bottom">
        <div className="text-lg inline-flex px-2  align-bottom">
          RRP{" "}
          {formatter.format(
            product.variants.edges[0].node.compareAtPrice.amount
          )}
        </div>
        {product.wasPrice ? (
          <div className="text-lg inline-flex px-2 align-bottom">
            Was {formatter.format(product.wasPrice)}
          </div>
        ) : (
          ""
        )}

        <div className="font-h text-2xl inline-flex px-2">
          Now {formatter.format(product.variants.edges[0].node.priceV2.amount)}
        </div>
      </div>
      {/* ATTEMPT 3 */}
      {product.variants.edges[0].node.compareAtPrice.amount >= 150 ||
      product.tags.toString().includes("MakeAnOffer") ? (
        <div className="mt-6 text-center">
          <div className="lg:inline text-center">
            <button className="lg:inline-flex w-full lg:w-1/2 cursor-auto bg-white text-center">
              <div className="inline-flex w-full border border-cream  hover:border-almostBlack">
                <span
                  className={
                    (offerPrice ? "text-almostBlack" : "text-cream") +
                    "inline-flex mt-3 pl-4 lg:pl-2 align-middle hover:text-almostBlack "
                  }
                >
                  £
                </span>
                <input
                  className="inline-flex lg:w-1/2 p-1 border-none active:border-none hover:border-none focus:ring-0 "
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder={""}
                />
                <Link
                  href={`https://wa.me/447718269608?text=I would like to make an offer on this ${product.title} for *£${offerPrice}* https://reliked.com/products/${product.handle}`}
                  target="_blank"
                  className="inline-flex text-center bg-cream p-3 w-full hover:bg-almostBlack hover:text-cream hover:border-almostBlack"
                >
                  {" "}
                  Make an offer
                </Link>
              </div>
            </button>

            <button className="lg:inline-flex w-full lg:w-1/2 cursor-auto text-center">
              <div className="inline-flex border border-taupe w-full bg-taupe text-taupe hover:bg-almostBlack hover:text-almostBlack hover:border-almostBlack">
                <span className="inline-flex pt-3 bg-inherit text-inherit ">
                  -
                </span>
                <button
                  className="inline-flex bg-taupe p-3 text-center w-full text-white hover:bg-almostBlack"
                  onClick={() => {
                    addToCart(selectedVariant);
                    setCartOpen(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">
          <button
            className="bg-taupe p-3 text-center w-full text-white hover:bg-almostBlack"
            onClick={() => {
              addToCart(selectedVariant);
              setCartOpen(true);
            }}
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
