import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { getPaste } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paste = await getPaste(req.query.id as string);
  if (!paste) {
    return res.status(404).json({ message: "Paste not found", code: 404 });
  } else {
    return res.status(200).send(paste.value);
  }
}
