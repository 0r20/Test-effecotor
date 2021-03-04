import Document, { Html, Head, Main, NextScript } from 'next/document';

const APP_NAME = 'Effector + SSR + PWA + SEO';
const APP_DESCRIPTION =
  'This is an example of using next-pwa plugin / effector';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="apple-mobile-web-app-status-bar" content="#ffffff" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/icon-16x16.png" />
          <link rel="apple-touch-icon" href="/icon-16x16.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
