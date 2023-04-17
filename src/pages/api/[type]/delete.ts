import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { getImageDeleteKey, deleteURL } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const deleteKey = req.query.key as string;
  if (!deleteKey)
    return res.status(400).json({ message: "Missing delete key", code: 400 });
  if (req.query.type) {
    const type = req.query.type;
    if (type == "paste") {
      for (const filename in fs.readdirSync(`./src/pastes`)) {
        const file = require(`@/pastes/${filename}`);
        if (file.deleteKey == deleteKey) {
          fs.unlink(`./src/pastes/${filename}`, err => {
            if (err) {
              return res
                .status(400)
                .json({ message: "Unexpected error occured", code: 400 });
            } else
              return res
                .status(200)
                .json({ message: "File deleted", code: 200 });
          });
        }
      }
      return res
        .status(400)
        .json({ message: "Invalid deletion key", code: 400 });
    } else if (type == "image") {
      const image = await getImageDeleteKey(deleteKey);
      if (image) {
        fs.unlink(`./public/images/${image.id}.png`, err => {
          if (err) {
            return res
              .status(400)
              .json({ message: "Unexpected error occured", code: 400 });
          } else
            return res.status(200).json({ message: "File deleted", code: 200 });
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid deletion key", code: 400 });
      }
    } else if (type == "url") {
      const result = await deleteURL(deleteKey);
      if (result == "Success") {
        return res.status(200).json({ message: "URL deleted", code: 200 });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid deletion key", code: 400 });
      }
    } else {
      res.status(405).json({ message: "Unknown delete type", code: 405 });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Missing specify delete type", code: 400 });
  }
}
