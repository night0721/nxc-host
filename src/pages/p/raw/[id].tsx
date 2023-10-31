import { GetServerSideProps } from "next";
import Header from "@/components/Header";
import { getPaste } from "@/utils/database";

interface Data {
  code: string;
}

export default function CodeDisplay({ code }: Data) {
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
  const paste = await getPaste(params?.id as string);
  if (!paste) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        code: paste.value || "",
      },
    };
  }
};
