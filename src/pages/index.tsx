import Head from "next/head";
import oembed from "@/public/data/oembed.json";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <title>NightX</title>
        <meta property="og:title" content={oembed.title} />
        <meta property="og:site_name" content={oembed.provider_name} />
        <meta name="theme-color" content="#deb4d1" data-react-helmet="true" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://avatars.githubusercontent.com/u/77528305?v=4"
        />
        <meta
          name="twitter:image:src"
          content="https://avatars.githubusercontent.com/u/77528305?v=4"
        />
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/77528305?v=4"
        />
        <meta name="twitter:title" content={oembed.title} />
        <meta name="twitter:description" content="NightX File Uploader" />
        <meta property="og:description" content="NightX File Uploader" />
        <link
          type="application/json+oembed"
          href={process.env.HOST + "/data/oembed.json"}
        />
      </Head>
      <div>
        <h1>NightX Client File Uploader</h1>
      </div>
    </>
  );
}
