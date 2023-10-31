import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createPaste, getUser } from "@/utils/database";

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  if (req.method == "POST") {
    if (!req.body.value) {
      return res.status(400).json({
        message: "Missing body value",
        code: 400,
      });
    }
    if (req.headers?.key) {
      const user = await getUser(req.headers.key as string);
      if (user && user.key == req.headers.key) {
        const id = await createPaste(req.body.value, user.username);
        return res
          .status(200)
          .json({ url: `${process.env.NEXT_PUBLIC_HOST}/p/${id}` });
      } else {
        return res.status(403).json({ message: "Unauthorized", code: 403 });
      }
    } else {
      const id = await createPaste(req.body.value, "");
      res.redirect(`${process.env.NEXT_PUBLIC_HOST}/p/${id}`);
    }
  } else {
    res.status(405).json({ message: "Method not allowed", code: 405 });
  }
}
