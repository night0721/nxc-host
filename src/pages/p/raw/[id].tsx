import { GetServerSideProps } from "next";
import fs from "fs";
import Header from "@/components/Header";

interface Data {
  code: string;
}

export default function CodeDisplay({ code }: Data) {
  console.log(code);
  return (
    <>
      <Header title="NXC Paste" />
      <pre>
        <code>{code}</code>
      </pre>
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
    const model = require(`../../../pastes/${params?.id}.json`);
    return {
      props: {
        code: (model.value as string) || "",
      },
    };
  }
};
