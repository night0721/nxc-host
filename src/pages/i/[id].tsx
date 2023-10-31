import { GetServerSideProps } from "next";
import styles from "@/styles/Image.module.css";
import Image from "next/image";
import Header from "@/components/Header";
import { getImageChunk } from "@/utils/database";
import { useState } from "react";

export type Data = {
  id: string;
  bin: Buffer;
};

export default function ImageDisplay({ id, bin }: Data) {
  const [paddingTop, setPaddingTop] = useState("0");
  return (
    <>
      <Header title="NXC Image" />
      <div className={styles.styles_box}>
        <div
          className={styles.image_container}
          style={{ paddingTop, position: "relative" }}
        >
          <Image
            src={`data:image/png;base64,${bin}`}
            alt="image"
            layout="fill"
            objectFit="contain"
            onLoad={({ target }) => {
              const { naturalWidth, naturalHeight } =
                target as HTMLImageElement;
              setPaddingTop(
                `calc(100% / (${naturalWidth} / ${naturalHeight}}))`
              );
            }}
          />
        </div>
        <div className={styles.buttons_container}>
          <a
            href={`${process.env.NEXT_PUBLIC_HOST}/i/raw/${id}`}
            className={styles.view_raw_button}
          >
            View Raw
          </a>
          <a href="/" className={styles.home_button}>
            Home
          </a>
        </div>
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
