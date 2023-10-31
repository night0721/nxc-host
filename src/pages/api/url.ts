import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createURL, getUser } from "@/utils/database";

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) {
  if (req.method == "POST") {
    if (!req.body.shortUrl) {
      return res.status(400).json({
        message: "Missing Short URL",
        code: 400,
      });
    }
    if (!req.body.fullUrl) {
      return res.status(400).json({
        message: "Missing Full URL",
        code: 400,
      });
    }
    if (req.headers?.key) {
      const user = await getUser(req.headers.key as string);
      if (user && user.key == req.headers.key) {
        const result = await createURL(
          req.body.shortUrl,
          req.body.fullUrl,
          user.username
        );
        if (result == "Exist") {
          return res
            .status(400)
            .json({ message: "Short URL already exist", code: 400 });
        }
        return res.status(200).json({
          url: `${process.env.NEXT_PUBLIC_HOST}/s/${result}`,
        });
      } else {
        return res.status(403).json({ message: "Unauthorized", code: 403 });
      }
    } else {
      const result = await createURL(req.body.shortUrl, req.body.fullUrl);
      if (result == "Exist") {
        return res
          .status(400)
          .json({ message: "Short URL already exist", code: 400 });
      }
      return res.redirect("/s");
    }
  } else {
    res.status(405).json({ message: "Method not allowed", code: 405 });
  }
}
