const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const credentials = `${pid}:${apiKey}`;
const encodedCredentials = Buffer.from(credentials).toString("base64");

export default async function GET(req, res) {
  const { searchParams } = new URL("http://localhost:3000/" + req.url);
  const useremail = searchParams.get("useremail");
  const useragenttype = searchParams.get("useragenttype");
  const useruuid = searchParams.get("useruuid");

  var data = "";

  if (useremail) {
    data = qs.stringify({
      useremail: useremail,
      useragenttype: useragenttype,
    });
  } else {
    data = qs.stringify({
      useragenttype: useragenttype,
      uuid: useruuid,
    });
  }

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

  // console.log({ inputData: data });
  // return;

  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  res.send(response);
}
