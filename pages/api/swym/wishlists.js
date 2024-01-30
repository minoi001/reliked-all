const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const credentials = `${pid}`;
// const encodedCredentials = Buffer.from(credentials).toString("urlencoded");
// pid needs to be url encoded

export default async function POST(req, res) {
  const { searchParams } = new URL("http://localhost:3000/" + req.url);
  const regid = searchParams.get("regid");
  const sessionid = searchParams.get("sessionid");

  const response = await axios.post(
    `${endpoint}/api/v3/lists/fetch-user-lists?pid=${encodeURIComponent(pid)}`,
    new URLSearchParams({
      sessionid: `${sessionid}`,
      regid: `${regid}`,
    }),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // console.log(response.data);
  res.send(response.data);
}
