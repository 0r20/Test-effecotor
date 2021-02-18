import { fork, serialize } from 'effector';
import styled from '@emotion/styled';
import { Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Link } from '@/src/ui/atoms';
import { app } from '@/src/features/common';

export default function Home() {
  return (
    <Container>
      <Box>
        <H3>Главная</H3>
        <Row justify="center" mx="100px" gap="50px">
          <Link href="/login">Войти</Link>
          <Link href="/register">Зарегистрироваться</Link>
        </Row>
      </Box>
    </Container>
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

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
