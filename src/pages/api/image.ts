import multer from "multer";
import uploader from "../../middlewares/upload";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { randomID } from "cath";
import fs from "fs";
import { createImage } from "@/utils/database";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      cb(null, `${randomID(12)}.png`);
    },
  }),
}).single("file");

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  if (req.method == "POST") {
    if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
      await uploader(req, res, upload);
      const id = req.file.filename.slice(0, -4);
      const deleteKey = createImage(id);
      res.status(200).send({
        url: `${process.env.NEXT_PUBLIC_HOST}/i/${id}`,
        deleteUrl: `${process.env.NEXT_PUBLIC_HOST}/api/image?key=${deleteKey}`,
      });
    } else {
      return res.status(400).json({ message: "Missing file", code: 400 });
    }
  } else {
    res.status(405).json({ message: "Method not allowed", code: 405 });
  }
}
