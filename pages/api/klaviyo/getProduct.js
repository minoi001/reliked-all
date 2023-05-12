// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPageFiles } from "next/dist/server/get-page-files";
import { getProduct } from "../../../lib/shopify";

export default async function handler(req, res) {
  console.log(req.body)
  let apiRes = await getProduct(req.body.id);
  // res.status(200).json({ createdAt: apiRes.createdAt });
  res.status(200).json(req.body);

}
