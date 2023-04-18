import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files: string[] = [];
  fs.readdirSync("./").forEach(dir => {
    if (dir.includes(".") || dir == "LICENSE") return files.push(dir);
    if (dir == "node_modules") return;
    const filesList = fs.readdirSync(`./${dir}/`).forEach(file => {
      files.push(`${dir}/${file}`);
    });
  });
  res.status(200).json({ files });
}
