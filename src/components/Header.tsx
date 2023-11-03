import oembed from "../../public/oembed.json";
import Head from "next/head";

type Title = {
  title: string;
};

export default function Header({ title }: Title) {
  return (
    <Head>
      <link rel="icon" type="image/png" href="/images/icon.jpg" />
      <title>{title}</title>

      {/* HTML Meta Tags */}
      <meta name="theme-color" content="#deb4d1" data-react-helmet="true" />
      <meta name="description" content={oembed.bio} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={oembed.title} />
      <meta itemProp="description" content={oembed.bio} />
      <meta itemProp="image" content={oembed.author_url} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={oembed.provider_url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={oembed.title} />
      <meta property="og:site_name" content={oembed.provider_name} />
      <meta property="og:description" content={oembed.bio} />
      <meta property="og:image" content={oembed.author_url} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={oembed.title} />
      <meta name="twitter:description" content={oembed.bio} />
      <meta name="twitter:image" content={oembed.author_url} />
      <meta name="twitter:image:src" content={oembed.author_url} />
      <meta content="video.other" property="og:type" />
      <meta content="image/gif" property="og:image:type" />
      <link
        type="application/json+oembed"
        href={`${process.env.NEXT_PUBLIC_HOST}/oembed.json`}
      />
    </Head>
  );
}
