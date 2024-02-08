const axios = require("axios");

var domain = process.env.SHOPIFY_STORE_DOMAIN;
var accessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;
var apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION;

async function createGiftCard(input) {
  try {
    const result = await axios({
      url: `https://${domain}/admin/api/${apiVersion}/gift_cards.json`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      data: {
        gift_card: {
          initial_value: input.initialValue,
          recipient_id: input.customerId,
          note: input.note,
        },
      },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error creating gift card:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    const result = await createGiftCard(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
