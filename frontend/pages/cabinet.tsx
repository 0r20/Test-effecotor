import React from 'react';
import Head from 'next/head';
import { CabinetContainer } from '@/src/containers/cabinet';
import { allSettled, fork, serialize } from 'effector';
import { $token, app, loadSession, TOKEN_ID } from '@/src/features/common';
import { parseCookies } from '@/src/features/common/lib/parseCookies';
import { GetServerSideProps } from 'next';

export default function Cabinet() {
  return (
    <>
      <Head>
        <title>Кабинет</title>
      </Head>
      <CabinetContainer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialState: any;
}> = async ({ req }) => {
  const scope = fork(app, {
    values: new Map([[$token, parseCookies(req)?.[TOKEN_ID]]]),
  });
  await allSettled(loadSession, { scope });
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
