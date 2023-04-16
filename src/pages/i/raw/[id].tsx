import { GetServerSideProps } from "next";
import "@/styles/CodeTheme.module.css";
import Image from "next/image";
import imageSize from "image-size";
import fs from "fs";
import Header from "@/components/Header";

type Data = {
  id: string;
  width: number;
  height: number;
  kb: number;
};
export default function CodeDisplay({ id, width, height, kb }: Data) {
  return (
    <>
      <Header />
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
  if (!id) {
    return {
      notFound: true,
    };
  }
  const path = `./public/images/${id}.png`;
  var stats = fs.statSync(path);
  return {
    props: {
      id,
      width: imageSize(path).width,
      height: imageSize(path).height,
      kb: stats.size / 1024,
    },
  };
};
