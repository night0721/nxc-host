import { GetServerSideProps } from "next";
import Image from "next/image";
import imageSize from "image-size";
import fs from "fs";
import Header from "@/components/Header";
import { tmpdir } from "os";
import { round } from "cath";

type Data = {
  id: string;
  width: number;
  height: number;
  kb: number;
};
export default function RawImage({ id, width, height, kb }: Data) {
  return (
    <>
      <Header title="NXC Image" />
      <Image
        src={`/images/${id}.png`}
        alt="image"
        width={width}
        height={height}
      />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id;
  if (!id || !fs.existsSync(`${tmpdir()}/nxc/${id}.png`)) {
    return {
      notFound: true,
    };
  }
  const path = `${tmpdir()}/nxc/${id}.png`;
  var stats = fs.statSync(path);
  return {
    props: {
      id,
      width: imageSize(path).width,
      height: imageSize(path).height,
      kb: round(stats.size / 1024, 2),
    },
  };
};
