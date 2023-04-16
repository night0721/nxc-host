import { NextApiRequest, NextApiResponse } from "next";
import { Multer } from "multer";

const applyMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: any
) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

export default applyMiddleware;
