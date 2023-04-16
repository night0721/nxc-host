import multer from "multer";
import applyMiddleware from "../../utils/applyMiddleware";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { randomID } from "cath";

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
      cb(null, `${randomID(10)}.png`);
    },
  }),
}).single("file");

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  await applyMiddleware(req, res, upload);
  res.status(200).send({
    url: `${process.env.NEXT_PUBLIC_HOST}/i/${req.file.filename.slice(0, -4)}`,
  });
}
