import React from 'react';
import Head from 'next/head';
import { CabinetContainer } from '@/src/containers/cabinet';

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
