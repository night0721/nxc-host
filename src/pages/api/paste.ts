import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { randomID } from "cath";
import fs from "fs";
import { getUser } from "@/utils/database";

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
    const filename: string = randomID(12);
    const deleteKey: string = randomID(40);
    if (req.headers?.key) {
      const user = await getUser(req.headers.key as string);
      if (user && user.key == req.headers.key) {
        fs.writeFileSync(
          `./src/pastes/${filename}.json`,
          JSON.stringify({
            id: filename,
            value: req.body.value,
            author: user.username,
            deleteKey,
          })
        );
        return res
          .status(200)
          .json({ url: `${process.env.NEXT_PUBLIC_HOST}/p/${filename}` });
      } else {
        return res.status(403).json({ message: "Unauthorized", code: 403 });
      }
    } else {
      fs.writeFileSync(
        `./src/pastes/${filename}.json`,
        JSON.stringify({
          id: filename,
          value: req.body.value,
          author: "",
          deleteKey,
        })
      );
      res.redirect(`${process.env.NEXT_PUBLIC_HOST}/p/${filename}`);
    }
  } else {
    res.status(405).json({ message: "Method not allowed", code: 405 });
  }
}
