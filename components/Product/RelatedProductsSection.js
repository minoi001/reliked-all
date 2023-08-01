import React from "react";

export default function RelatedProductsSection() {
  const images = [
    {
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg",
      price: "£30.90",
      description: "red tshirt",
    },
    {
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg",
      price: "£60.75",
      description: "red tshirt",
    },
    {
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg",
      price: "23.80",
      description: "red tshirt",
    },
  ];

  return (
    <div>
      <hr className="mt-40 mb-20"/> <h3 className="flex justify-center mb-20">More products you might like</h3>
      <div className="flex flex-row justify-evenly">
        {images.map((image) => (
          <div className="flex flex-col">
            <img src={image.image} />
            <span>{image.price}</span>
            <span>{image.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
