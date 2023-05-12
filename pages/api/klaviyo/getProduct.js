// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPageFiles } from "next/dist/server/get-page-files";
import { getProduct } from "../../../lib/shopify";

export default async function handler(req, res) {
  let apiRes = await getProduct(req.id);
  res.status(200).json({ createdAt: apiRes.createdAt });
}
