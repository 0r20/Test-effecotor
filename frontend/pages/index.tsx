// import { useEvent, useStore, useList } from 'effector-react/ssr';
import { allSettled, fork, serialize } from 'effector';
// import {
//   $users,
//   addUser,
//   usersFetching,
//   pageMounted,
// } from '@/src/models/ssr-data-example';
// import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Link } from '@/src/ui/atoms';
import NextLink from 'next/link';
import { app } from '@/src/features/common';

export default function Home() {
  // const isLoading = useStore(usersFetching.isLoading);
  // const isFailed = useStore(usersFetching.isFailed);
  // const error = useStore(usersFetching.error);
  // const addUserEvent = useEvent(addUser);
  // const pageMountedEvent = useEvent(pageMounted);

  // useEffect(() => {
  //   pageMountedEvent();
  // }, []);

  // const renderUsers = useList($users, (user, idx) => (
  //   <div key={idx}>
  //     <h1>Name: {user.name}</h1>
  //     <span>Id: {idx}</span>
  //   </div>
  // ));

  // if (isLoading) {
  //   return <p>Загрузка...</p>;
  // }

  // if (isFailed) {
  //   return <p>{error.message}</p>;
  // }

  return (
    <Container>
      <Box>
        <H3>Главная</H3>
        <Row justify="center" mx="100px" gap="50px">
          <Link href="/login">Войти</Link>
          <Link href="/register">Зарегистрироваться</Link>
        </Row>
      </Box>
      {/* <div>{renderUsers}</div> */}
      {/* <button onClick={() => addUserEvent({ name: 'FromClick' })}>Add</button> */}
      {/* <button onClick={() => pageMountedEvent()}>Mounted</button> */}
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const scope = fork(app);
  // await allSettled(loadUsers, { scope });
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
