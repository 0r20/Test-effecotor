import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { Input } from '@/src/ui/molecules/input';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { loginValidate } from '@/src/features/common';
import { Box, H3, Button, Link } from '@/src/ui/atoms';
import { loginProccesing } from './model';

export const LoginContainer = () => {
  const handleSubmit = (values: LoginFormValues) => {
    loginProccesing(values);
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit} />
    </Container>
  );
};

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Box>
      <H3>Логин</H3>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidate}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await onSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<LoginFormValues>) => (
          <Form>
            <Col align="center">
              <Input type="email" name="email" placeholder="E-mail" />
              <Input type="password" name="password" placeholder="Пароль" />
              <Button type="submit" disabled={!(dirty && isValid)}>
                Подтвердить
              </Button>
              <Row justify="center" mt="30px">
                <Link href="/register">Зарегистрироваться</Link>
              </Row>
            </Col>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
