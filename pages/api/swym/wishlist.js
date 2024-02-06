const axios = require("axios");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;

export default async function POST(req, res) {
  const { searchParams } = new URL("http://localhost:3000/" + req.url);

  const response = await axios.post(
    `${endpoint}/api/v3/lists/fetch-list-with-contents?pid=${encodeURIComponent(
      pid
    )}`,
    new URLSearchParams({
      sessionid: `${searchParams.get("sessionid")}`,
      regid: `${searchParams.get("regid")}`,
      lid: `${searchParams.get("lid")}`,
    }),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  // console.log(response.data);
  res.send(response.data);
}
