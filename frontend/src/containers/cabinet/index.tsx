import { $currentUser, chechAuthState } from '@/src/features/common';
import { logout } from '@/src/features/common';
import { Box, Button, H3 } from '@/src/ui/atoms';
import { Container } from '@/src/ui/organisms';
import { useStore, useEvent } from 'effector-react/ssr';
import React, { useEffect } from 'react';

export const CabinetContainer = () => {
  const user = useStore($currentUser);
  const logoutEvent = useEvent(logout);
  const chechAuthStateEvent = useEvent(chechAuthState);
  console.log('clientuser', user);

  useEffect(() => {
    chechAuthStateEvent();
  }, []);

  const logoutHandler = () => {
    logoutEvent();
  };

  return (
    <Container>
      <Box>
        <H3>Вас зовут: {user?.name}</H3>
        <Button onClick={logoutHandler}>Выйти</Button>
      </Box>
    </Container>
  );
};
