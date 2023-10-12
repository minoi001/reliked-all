import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Questrial&display=swap"
          rel="stylesheet"
        ></link>
        {/* <script
          src="https://unpkg.com/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.js"
          type="module"
        ></script>
        <link
          href="https://unpkg.com/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
          rel="stylesheet"
        ></link> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
