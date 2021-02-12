import Head from 'next/head';
import nprogress from 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import { Provider as EffectorProvider } from 'effector-react/ssr';
import { fork, serialize } from 'effector/fork';
import root from '@/models/root';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const isBrowser = () => typeof window !== 'undefined';

let currentScope;
let scope;

function serializeDiff(root, scope) {
  const ignore = [];
  for (const store of root.history.stores) {
    let needIgnore = true;
    try {
      needIgnore = scope.getState(store) === store.defaultState;
    } catch (err) {}
    if (needIgnore) {
      ignore.push(store);
    }
  }
  return serialize(scope, { ignore });
}

export default function App({ Component, pageProps }) {
  if (isBrowser()) {
    if (currentScope) {
      scope = fork(root, {
        values: {
          ...pageProps.store,
          ...serializeDiff(root, currentScope),
        },
      });
    } else {
      scope = fork(root, { values: pageProps.store });
    }
    currentScope = scope;
  } else {
    scope = fork(root, { values: pageProps.store });
  }

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
      <EffectorProvider value={scope}>
        <Component {...pageProps} />
      </EffectorProvider>
    </>
  );
}
