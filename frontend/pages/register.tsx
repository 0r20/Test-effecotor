import { RegisterContainer } from '@/src/containers/register';
import React from 'react';
import Head from 'next/head';
import { fork, serialize } from 'effector';
import { app } from '@/src/features/common';

export default function Register() {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <RegisterContainer />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const scope = fork(app);
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
