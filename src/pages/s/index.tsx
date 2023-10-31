import Head from "next/head";
import style from "../../styles/URLHomePage.module.css";
import { getAllURL, URL } from "@/utils/database";
import { GetServerSideProps } from "next";
import Header from "@/components/Header";

interface ShortURLs {
  urls: URL[];
}

export default function Shortener({ urls }: ShortURLs) {
  return (
    <>
      <Header title="URL Shortener" />
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="container">
        <h1 className="text-center">URL Shortener</h1>
        <form action="/api/url" method="POST" className="my-4 form">
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Long URL</label>
            <input
              required
              type="url"
              className="form-control"
              name="fullUrl"
              placeholder="Your URL"
            />
          </div>

          <label htmlFor="e">Your Extension</label>
          <div className="form-group form-inline">
            <input
              readOnly
              type="text"
              id="e"
              className="form-control"
              placeholder={`${process.env.NEXT_PUBLIC_HOST}/s`}
            />
            <p className={style.slash}>/</p>
            <input
              required
              type="text"
              id="e"
              className="form-control"
              name="shortUrl"
              placeholder="example-endpoint"
            />
          </div>
          <br />
          <button className={style.btn} type="submit">
            Shorten
          </button>
        </form>
        <br />
        <h3 className="text-center">All URLs</h3>
        <table className="table table-striped table-responsive justify-content-center">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((shortUrl, i) => (
              <>
                <tr key={i}>
                  <td className="justify-content-center" key={i}>
                    <a href={shortUrl.full}>{shortUrl.full}</a>
                  </td>
                  <td key={i}>
                    <a
                      href={`${process.env.NEXT_PUBLIC_HOST}/s/${shortUrl.short}`}
                    >
                      {shortUrl.short}
                    </a>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <style>
        {`
        body {
          background-color: #78c4e7;
        }
        th,
        td,
        text-center,
        label,
        p,
        text-center {
          color: white;
        }
        `}
      </style>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<ShortURLs> = async () => {
  const urls = await getAllURL();
  return { props: { urls, fallback: false } };
};
