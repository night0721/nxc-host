import Head from "next/head";
import { GetServerSideProps } from "next";
import oembed from "@/public/data/oembed.json";
import Script from "next/script";
import { useEffect, useRef } from "react";
// import styles from "@/styles/Code.module.css";
// import "@/styles/CodeTheme.module.css";

interface Data {
  id: string;
  code: string;
  canSave: boolean;
}

export default function CodeDisplay() {
  useKey("ctrls", () => console.log("Ctrl+S fired!"));
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
        <Script src="/script/code.js" />
      </Head>
      <body>
        <form action="/api/codes/create/" method="post">
          <div className="buttons-wrapper">
            <a href="/" className="logo">
              Paste
            </a>
            <div className="buttons">
              <a href="/c/" className="btn">
                New
              </a>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </div>

          <div className="wrapper">
            <div className="line-numbers">&gt;</div>
            <textarea name="value" id="value" autoFocus></textarea>
          </div>
        </form>

        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/autosize.js/5.0.1/autosize.min.js"
          integrity="sha512-aBxhlAogg9r6Gtes+dsuqW6IQ4Ee0MtjexckbMNOVdxAfi5NSEd38BNEgFiaBWS6cl67r+8OImzxVKDdmswhnA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </body>
      <style>
        {`body {
            background-color: #002b36;
            margin: 0;
            }
            .wrapper {
            display: flex;
            padding: 1rem 0.5rem;
            font-size: 1rem;
            }
            pre {
            margin: 0;
            }
            #code-display {
            padding-top: 0;
            padding-bottom: 0;
            }
            .line-numbers {
            color: #7d7d7d;
            font-family: monospace;
            text-align: end;
            cursor: default;
            user-select: none;
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
            }
            .buttons-wrapper {
            position: fixed;
            top: 0;
            right: 0;
            opacity: 0.15;
            transition: opacity 0.2s ease-in-out;
            background-color: #0081a2;
            padding: 1rem;
            }
            .buttons-wrapper:hover {
            opacity: 1;
            }
            .logo {
            font-size: 2rem;
            text-align: center;
            text-decoration: none;
            color: #fff;
            width: 100%;
            display: inline-block;
            }
            .logo:hover {
            text-decoration: underline;
            }
            .buttons {
            display: flex;
            margin-top: 0.5rem;
            justify-content: center;
            }
            .buttons > * + * {
            margin-left: 0.25rem;
            }
            .btn {
            cursor: pointer;
            background: 0 0;
            border: 1px solid #002b36;
            border-radius: 0.25rem;
            padding: 0.25rem 0.5rem;
            transition: background-color 0.2s ease-in-out;
            display: inline-block;
            text-decoration: none;
            color: #000;
            }
            .btn:hover {
            background-color: #83e5ff;
            }`}
      </style>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps<Data> = async ({
//   params,
// }) => {
//   const model = require(`../../../public/data/${params?.id}.json`);
//   return {
//     props: {
//       id: params?.id as string,
//       code: (model.value as string) || "",
//       canSave: false,
//     },
//   };
// };
function useKey(key: string, cb: (event: KeyboardEvent) => void) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (key === "ctrls" && event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        callback.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
}
