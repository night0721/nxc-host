import { useRouter } from "next/router";
import { getFullURL } from "@/utils/database";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

interface URL {
  url: string | undefined;
}

export default function Redirect({ url }: URL) {
  const router = useRouter();
  useEffect(() => {
    router.push(url ? url : "/");
  }, []);
  return <></>;
}

export const getServerSideProps: GetServerSideProps<URL> = async ({
  params,
}) => {
  if (params) {
    const full = await getFullURL(params.id as string);
    if (full) return { props: { url: full } };
    else return { props: { url: undefined } };
  }
  return { props: { url: undefined } };
};
