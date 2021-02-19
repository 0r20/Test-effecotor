import { fork, serialize } from 'effector';
import { Row } from '@/src/lib/styled-components-layout';
import { Box, Button, H3, Link } from '@/src/ui/atoms';
import { app } from '@/src/features/common';
import { ensureAuth } from '@/src/features/common/lib/ensure';
import { Container } from '@/src/ui/organisms';
import { useEvent } from 'effector-react/ssr';
import { modelOpened } from '@/src/features/modal';

export default function Home() {
  const openModalEvent = useEvent(modelOpened);
  return (
    <Container>
      <Box>
        <H3 center>Главная</H3>
        <Row justify="center" mx="100px" gap="50px">
          <Link href="/login">Войти</Link>
          <Link href="/register">Зарегистрироваться</Link>
          <Button
            onClick={() => openModalEvent({ kind: 'logout', props: null })}
          >
            Modal
          </Button>
        </Row>
      </Box>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  ensureAuth(ctx, 'public');
  const scope = fork(app);
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
