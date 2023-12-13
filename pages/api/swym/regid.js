const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const credentials = `${pid}:${apiKey}`;
const encodedCredentials = Buffer.from(credentials).toString("base64");

export default async function handler(req, res) {
  var data = qs.stringify({
    useragenttype: "headlessSite",
    useremail: "imo@reliked.com",
  });

  var config = {
    method: "post",
    url: `${endpoint}/storeadmin/v3/user/generate-regid`,
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    data: data,
  };

  const wishlist = await axios(config)
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send(wishlist);
}
