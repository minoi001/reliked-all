import ProductForm from "./ProductForm";
import { ShopContext } from "../../context/shopContext";
import { render, screen } from "@testing-library/react";

describe("ProductForm", () => {
  it("should render the component", () => {
    const { queryByText } = renderProductForm({
      addToCart: () => {},
      setCartOpen: () => {},
    });
    expect(queryByText("Make an offer")).toBeTruthy();
    screen.logTestingPlaygroundURL();
  });
});

const renderProductForm = (value) => {
  return render(
    <ShopContext.Provider value={value}>
      <ProductForm
        product={{
          descriptionHtml: "<p>test</p>",
          condition: {
            value: "New",
          },
          packaging: {
            value: "Original",
          },
          tags: ["MakeAnOffer"],
          options: [
            {
              id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0T3B0aW9uLzI3NzQ2MDQ3NjU1NzQ=",
              name: "Size",
              values: ["38", "40", "42", "44", "46", "48", "50"],
            },
          ],
          variants: {
            edges: [
              {
                node: {
                  id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjM3MjYyNjY5MzE0NQ==",
                  image: {
                    url: "https://cdn.shopify.com/s/files/1/2481/5934/products/IMG_20210227_143923_2_360x.jpg?v=1614449196",
                  },
                  priceV2: {
                    amount: "10.0",
                    currencyCode: "GBP",
                  },
                  selectedOptions: [
                    {
                      name: "38",
                      value: "38",
                    },
                  ],
                  title: "Default Title",
                  compareAtPrice: {
                    amount: "20.0",
                    currencyCode: "GBP",
                  },
                },
              },
            ],
          },
        }}
      />
    </ShopContext.Provider>
  );
};
