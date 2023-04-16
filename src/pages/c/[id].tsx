import Head from "next/head";
import { GetServerSideProps } from "next";
import oembed from "@/public/data/oembed.json";
import styles from "@/styles/Code.module.css";
import "@/styles/CodeTheme.module.css";

interface Data {
  id: string;
  code: string;
  canSave: boolean;
}

export default function CodeDisplay({ id, code, canSave }: Data) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <title>NightX Paste</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={oembed.title} />
        <meta property="og:site_name" content={oembed.provider_name} />
        <meta name="theme-color" content="#deb4d1" data-react-helmet="true" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://cdn.discordapp.com/avatars/452076196419600394/77930f36d424462ea2eef5dc781d12d4.png?size=64"
        />
        <meta
          name="twitter:image:src"
          content="https://cdn.discordapp.com/avatars/452076196419600394/77930f36d424462ea2eef5dc781d12d4.png?size=64"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/avatars/452076196419600394/77930f36d424462ea2eef5dc781d12d4.png?size=64"
        />
        <meta name="twitter:title" content={oembed.title} />
        <link
          type="application/json+oembed"
          href={process.env.NEXT_PUBLIC_HOST + "/data/oembed.json"}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/base16/solarized-dark.min.css"
          integrity="sha512-kBHeOXtsKtA97/1O3ebZzWRIwiWEOmdrylPrOo3D2+pGhq1m+1CroSOVErIlsqn1xmYowKfQNVDhsczIzeLpmg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div className={styles.main}>
        <div className={styles.buttons_wrapper}>
          <a href="/" className={styles.logo}>
            Paste
          </a>
          <div className={styles.buttons}>
            <a href="/c/" className={styles.btn}>
              New
            </a>
            {canSave && (
              <button type="submit" className={styles.btn}>
                Save
              </button>
            )}
            {id != null && (
              <a href={`/c/${id}/duplicate`} className={styles.btn}>
                Duplicate
              </a>
            )}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.line_numbers}>
              {code.split("\n").map((_: any, index: number) => (
                <div key={_}>{index}</div>
              ))}
            </div>
            <pre className={styles.code}>
              <code className={styles.code_display}>{code}</code>
            </pre>
          </div>
        </div>
      </div>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"
        integrity="sha512-gU7kztaQEl7SHJyraPfZLQCNnrKdaQi5ndOyt4L4UPL/FHDd/uB9Je6KDARIqwnNNE27hnqoWLBq+Kpe4iHfeQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
      <script>hljs.highlightAll();</script>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<Data> = async ({
  params,
}) => {
  const model = require(`../../../public/data/${params?.id}.json`);
  return {
    props: {
      id: params?.id as string,
      code: (model.value as string) || "",
      canSave: false,
    },
  };
};
