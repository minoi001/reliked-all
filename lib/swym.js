const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const authorization = Buffer.from(
  `${process.env.SWYM_PID}:${process.env.SWYM_API_KEY}`,
  "base64"
);

// uuid for guests, useremail for logged in users
var data = qs.stringify({
  useragenttype: "headlessSite",
  uuid: "e80c9d38-bdc9-40e8-ac8a-528d33360e1c",
});

var config = {
  method: "post",
  url: `${endpoint}/storeadmin/v3/user/generate-regid`,
  headers: {
    Authorization: `Basic ${authorization}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
