// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    res.status(200).send(require("@/public/data/oembed.json"));
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
