const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const authorization = Buffer.from(`${pid}:${apiKey}`, "base64");
const pid64 = Buffer.from(`${pid}`, "base64");
const apiKey64 = Buffer.from(`${apiKey}`, "base64");
// uuid for guests, useremail for logged in users
var data = qs.stringify({
  useragenttype: "headlessSite",
  useremail: "imo@reliked.com",
});

var config = {
  method: "post",
  url: `${endpoint}/storeadmin/v3/user/generate-regid`,
  headers: {
    Authorization: `Basic "${pid64}:${apiKey64}"`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: data,
};

export async function getWishlist() {
  console.log(pid64);
  console.log(apiKey64);
  console.log(authorization);

  const wishlist = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(wishlist);
}

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
