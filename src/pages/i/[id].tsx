import { GetServerSideProps } from "next";
import styles from "@/styles/Image.module.css";
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
export default function ImageDisplay({ id, width, height, kb }: Data) {
  return (
    <>
      <Header title="NXC Image" />
      <div className={styles.styles_box}>
        <div className={styles.file_info}>
          <div className={styles.file_name}>{id}.png</div>
          <div className={styles.file_size}>{kb} KB</div>
        </div>
        <div className={styles.image_container}>
          <Image
            src={`/images/${id}.png`}
            alt="image"
            width={width}
            height={height}
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
  if (!id || !fs.existsSync(`./public/images/${id}.png`)) {
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
      kb: round(stats.size / 1024, 2),
    },
  };
};

function round(value: number, decimals: number) {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}
