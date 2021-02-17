import { LoginContainer } from '@/src/containers/login';
import React from 'react';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Логин</title>
      </Head>
      <LoginContainer />
    </>
  );
}
