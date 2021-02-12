import Head from 'next/head';
import { useList, useStore } from 'effector-react';
import { $users, update } from '@/models/users';
import { Button, Container, Inner } from '@/utils/styles';
import { allSettled, fork, serialize } from 'effector';
import { $ssrData, getSSRDataExampleFx } from '@/models/ssr-data-example';
import root from '@/models/root';

export const getServerSideProps = async (ctx) => {
  const scope = fork(root);
  await allSettled(getSSRDataExampleFx, { scope });

  return {
    props: {
      store: serialize(scope),
    },
  };
};

export default function Home() {
  const ssrData = useStore($ssrData);

  const handleClick = () => {
    update({
      id: 10,
      name: 'Володя',
    });
  };

  const renderUsers = useList($users, (user) => (
    <div key={user.id}>
      <h1>Name: {user.name}</h1>
      <span>Id: {user.id}</span>
    </div>
  ));

  return (
    <Container>
      <Head>
        <title>Название</title>
      </Head>
      <h1>{JSON.stringify(ssrData, null, '  ')}</h1>
      <Inner>{renderUsers}</Inner>
      <Button onClick={handleClick}>Добавить</Button>
    </Container>
  );
}
