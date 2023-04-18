import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { tmpdir } from "os";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files: string[] = [];
  fs.readdirSync(`${tmpdir()}/nxc`).forEach(file => {
    files.push(`${file}`);
  });
  res.status(200).json({ files });
}
