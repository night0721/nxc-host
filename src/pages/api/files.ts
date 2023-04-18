import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files: string[] = [];
  fs.readdirSync("./public").forEach(dir => {
    if (dir == "oembed.json") return files.push(dir);
    const filesList = fs.readdirSync(`./public/${dir}/`);
    files.push(...filesList.map(file => `${dir}/${file}`));
  });
  res.status(200).json({ files });
}
