import { GetServerSideProps } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import { Data } from "../[id]";
import { useState } from "react";
import { getImageChunk } from "@/utils/database";

export default function RawImage({ id, bin }: Data) {
  const [paddingTop, setPaddingTop] = useState("0");
  return (
    <>
      <Header title="NXC Image" />
      <div style={{ paddingTop, position: "relative" }}>
        <Image
          src={`data:image/png;base64,${bin}`}
          alt="image"
          layout="fill"
          objectFit="contain"
          onLoad={({ target }) => {
            const { naturalWidth, naturalHeight } = target as HTMLImageElement;
            setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight}}))`);
          }}
        />
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id;
  const bin = await getImageChunk(id as string);
  if (bin) {
    return {
      props: {
        id,
        bin,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
