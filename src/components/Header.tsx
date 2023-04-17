import oembed from "../../public/oembed.json";
import Head from "next/head";
type Title = {
  title: string;
};
export default function Header({ title }: Title) {
  return (
    <Head>
      <link rel="icon" type="image/png" href="/images/icon.png" />
      <title>{title}</title>
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
        href={`${process.env.NEXT_PUBLIC_HOST}/oembed.json`}
      />
    </Head>
  );
}
