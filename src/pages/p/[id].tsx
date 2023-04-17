import { GetServerSideProps } from "next";
import fs from "fs";
import Header from "@/components/Header";
import Highlight from "react-highlight";
import styles from "@/styles/Code.module.css";

interface Data {
  code: string;
}

export default function CodeDisplay({ code }: Data) {
  return (
    <>
      <Header title="NXC Paste" />
      <div className={styles.buttons_wrapper}>
        <a href="/" className={styles.logo}>
          NXC Paste
        </a>
        <div className={styles.buttons}>
          <a href="/p/" className={styles.btn}>
            New
          </a>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.line_numbers}>
          {code.split("\n").map((line, index) => (
            <>
              <div key={line}>{index + 1}</div>
            </>
          ))}
        </div>
        <Highlight>{code}</Highlight>
      </div>
      <style>
        {`body {
            background-color: #002b36;
            margin: 0;
          }
          pre {
            margin: 0;
          }
          #code-display {
            padding-top: 0;
            padding-bottom: 0;
          }
          textarea {
            background-color: transparent;
            resize: none;
            width: 100%;
            padding: 0;
            margin-left: 1rem;
            color: #7d7d7d;
            min-height: calc(100vh - 2rem);
            border: none;
            outline: 0;
          }`}
      </style>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<Data> = async ({
  params,
}) => {
  if (!fs.existsSync(`${process.cwd()}/src/pastes/${params?.id}.json`)) {
    return {
      notFound: true,
    };
  } else {
    const model = require(`../../pastes/${params?.id}.json`);
    return {
      props: {
        code: (model.value as string) || "",
      },
    };
  }
};
