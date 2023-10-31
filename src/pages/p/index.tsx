import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Code.module.css";

interface Data {
  id: string;
  code: string;
}

export default function CodeDisplay() {
  useKey("ctrls", () => {
    document.getElementById("submit")?.click();
  });
  return (
    <>
      <Header title="NXC Paste" />
      <form action="/api/paste/" method="post">
        <div className={styles.buttons_wrapper}>
          <a href="/" className={styles.logo}>
            NXC Paste
          </a>
          <div className={styles.buttons}>
            <a href="/p/" className={styles.btn}>
              New
            </a>
            <button type="submit" id="submit" className={styles.btn}>
              Save
            </button>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.line_numbers}>&gt;</div>
          <textarea name="value" id="value" autoFocus></textarea>
        </div>
      </form>
      <style>
        {`body {
            background-color: #002b36;
            margin: 0;
          }
          pre {
            margin: 0;
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
          }`}
      </style>
    </>
  );
}
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
