import multer from "multer";
import uploader from "../../middlewares/upload";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { randomID } from "cath";
import client, { createImage } from "@/utils/database";
import { GridFsStorage } from "multer-gridfs-storage";
import { tmpdir } from "os";
import { GridFSBucket } from "mongodb";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: new GridFsStorage({
    url: process.env.MONGO as string,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const id = randomID(12);
      return {
        bucketName: "photos",
        id,
        filename: `${id}.png`,
      };
    },
  }),
  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "./public/images");
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, `${randomID(12)}.png`);
  //   },
  // }),
}).single("file");

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  if (req.method == "POST") {
    if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
      await uploader(req, res, upload);
      const id = req.file.id;
      const deleteKey = await createImage(id);
      const bucket = new GridFSBucket((await client).db("NXC"), {
        bucketName: "photos",
      });
      if (!fs.existsSync(`${tmpdir()}/nxc`)) {
        fs.mkdirSync(`${tmpdir()}/nxc`);
      }
      bucket
        .openDownloadStreamByName(id + ".png")
        .pipe(fs.createWriteStream(`${tmpdir()}/nxc/${id}.png`));
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
