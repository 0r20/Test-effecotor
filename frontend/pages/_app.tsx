import Head from 'next/head';
import nprogress from 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import App, { AppContext, AppProps } from 'next/app';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      </Head>
      <Global
        styles={css`
          ${emotionReset}
          *, *::after, *::before {
            box-sizing: border-box;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const { Component } = AppContext;
  const appProps = Component.getInitialProps
    ? await App.getInitialProps(AppContext)
    : {};

  return {
    ...appProps,
  };
};

export default MyApp;
