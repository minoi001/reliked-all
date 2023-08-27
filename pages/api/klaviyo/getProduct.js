// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPageFiles } from "next/dist/server/get-page-files";
import { getProduct } from "../../../lib/shopify";

export default async function handler(req, res) {
  console.log(req.body);
  let handle = req.body.handle.replace("https://reliked.com/products/", "");
  let apiRes = await getProduct(handle);
  res.status(200).json({ createdAt: apiRes.createdAt });
}
