export const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

export const formatImageUrl = (url, imagesize) => {
  if (url) {
    return url
      .replace(".png?", `_${imagesize}x${imagesize}.png?`)
      .replace(".jpg?", `_${imagesize}x${imagesize}.jpg?`);
  } else {
    return;
  }
};
