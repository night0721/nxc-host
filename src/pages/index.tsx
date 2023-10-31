import Head from "next/head";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header title="NXC File Uploader" />
      <div>
        <h1>NightX Client File Uploader</h1>
        <pre>
          <code>{`/s -> URL Shortener\n`}</code>
          <code>{`/s/:id -> Redirecting to Long URL\n`}</code>
          <code>{`/p -> Paste Bin\n`}</code>
          <code>{`/p/:id -> Paste by specific ID\n`}</code>
          <code>{`/raw/:id -> Raw Paste by specific ID\n`}</code>
          <code>{`/i -> Image Uploader\n`}</code>
          <code>{`/i/:id -> Image by specific ID\n`}</code>
          <code>{`/i/raw/:id -> Raw Image by specific ID\n`}</code>
          <code>{`/api/:type/delete -> Delete model by type\n`}</code>
          <code>{`/api/files -> Get all files in server directory\n`}</code>
          <code>{`/api/temp -> Get temporary files in /tmp/nxc\n`}</code>
          <code>{`POST /api/image -> Send new image to server\n`}</code>
          <code>{`POST /api/paste -> Send new paste to server\n`}</code>
          <code>{`POST /api/url -> Send new URL to server\n`}</code>
        </pre>
      </div>
    </>
  );
}
