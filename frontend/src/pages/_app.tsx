import nprogress from 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider as EffectorProvider } from 'effector-react/ssr';
import { app } from '@/src/features/common';
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useLogger, useScope } from '@/src/lib/effector-setup';
import { Global } from '@emotion/react';
import { globalStyles } from '@/globalStyles';
import antd from 'antd/dist/antd.min.css';
import { Alert } from '@/src/features/alert';
import { MainModal } from '@/src/features/modal';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const scope = useScope(app, pageProps.initialState);

  useLogger(app);

  return (
    <EffectorProvider value={scope}>
      <React.Fragment>
        <Head>
          <title>My page</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/icon-16x16.png" />
          <link rel="apple-touch-icon" href="/icon-16x16.png" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-status-bar" content="#000000" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            rel="preload"
            href="/fonts/Play-Regular.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/Play-Bold.woff2"
            as="font"
            type="font/woff2"
          />
          <link rel="stylesheet" href="/fonts/fonts.css" />
          <style dangerouslySetInnerHTML={{ __html: nprogress }} />
          <style dangerouslySetInnerHTML={{ __html: antd }} />
        </Head>
        <Alert />
        <MainModal />
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </React.Fragment>
    </EffectorProvider>
  );
}
