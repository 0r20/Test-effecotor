import { RegisterContainer } from '@/src/containers/register';
import React from 'react';
import Head from 'next/head';

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
