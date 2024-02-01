const axios = require("axios");
const endpoint = process.env.SWYM_ENDPOINT;
const pid = process.env.SWYM_PID;
const apiKey = process.env.SWYM_API_KEY;

const credentials = `${pid}`;

export default async function POST(req, res) {
  const { searchParams } = new URL("http://localhost:3000/" + req.url);
  let request = JSON.parse(req.body);
  // console.log("brandnewTesttt", request);
  // console.log({
  //   params: {
  //     regid: `${searchParams.get("regid")}`,
  //     sessionid: `${searchParams.get("sessionid")}`,
  //     lid: `${searchParams.get("lid")}`,
  //     [request.reqType]: JSON.stringify([
  //       {
  //         epi: request.variantId,
  //         empi: request.productId,
  //         du: `https://e-bloggers.myshopify.com/products/${request.handle}`,
  //       },
  //     ]),
  //   },
  // });
  const response = await axios
    .post(
      `${endpoint}/api/v3/lists/update-ctx?pid=${encodeURIComponent(pid)}`,
      null,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "user-agent": "headlessSite",
        },
        params: JSON.stringify({
          [request.reqType]: [
            {
              epi: request.variantId,
              empi: request.productId,
              du: `https://e-bloggers.myshopify.com/${request.handle}`,
            },
          ],
          regid: searchParams.get("regid"),
          sessionid: searchParams.get("sessionid"),
          lid: searchParams.get("lid"),
        }),
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  res.send(response);
}
