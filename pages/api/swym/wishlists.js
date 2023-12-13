const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const credentials = `${pid}:${apiKey}`;
const encodedCredentials = Buffer.from(credentials).toString("base64");

export default async function POST(req, res) {
  const { searchParams } = new URL("http://localhost:3000/" + req.url);
  const regid = searchParams.get("regid");
  const sessionid = searchParams.get("sessionid");
  console.log(regid, sessionid);
  var data = qs.stringify({
    regid: regid,
    sessionid: sessionid,
  });

  var config = {
    method: "post",
    url: `${endpoint}/api/v3/lists/fetch-user-lists?pid=${Buffer.from(
      pid
    ).toString("base64")}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  // console.log({ data: data });
  // return;

  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  console.log(response);
  res.send(response);
}
