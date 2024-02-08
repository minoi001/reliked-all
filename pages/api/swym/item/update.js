const axios = require("axios");
const qs = require("qs");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;

export default async function POST(req, res) {
  const { searchParams } = new URL("http://localhost:3000/" + req.url);
  let request = JSON.parse(req.body);
  let data = qs.stringify({
    // Request type: "a" for add, "d" for delete, "u" for update
    [request.type]: `${request.string}`,
    regid: searchParams.get("regid"),
    sessionid: searchParams.get("sessionid"),
    lid: searchParams.get("lid"),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${endpoint}/api/v3/lists/update-ctx?pid=${encodeURIComponent(pid)}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  let response = await axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      // console.log(error);
    });

  res.send(response);
}
