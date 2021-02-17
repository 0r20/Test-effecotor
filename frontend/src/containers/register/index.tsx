import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { Select } from 'antd';
import { Input } from '@/src/ui/molecules/input';
import { registerValidate } from '@/src/features/common';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Button, Link } from '@/src/ui/atoms';
import { registerProccesing } from './model';

const { Option } = Select;

export const RegisterContainer = () => {
  const handleSubmit = (values: RegisterFormValues) => {
    registerProccesing(values);
  };

  return (
    <Container>
      <RegisterForm onSubmit={handleSubmit} />
    </Container>
  );
};

export interface RegisterFormValues {
  company: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  return (
    <Box>
      <H3>Регистрация</H3>
      <Formik
        initialValues={{
          company: '',
          name: '',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          password: '',
          role: '3',
        }}
        validationSchema={registerValidate}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await onSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          dirty,
          isValid,
          setFieldValue,
        }: FormikProps<RegisterFormValues>) => (
          <Form>
            <Col>
              <Row justify="space-around">
                <Col>
                  <Input type="text" name="name" placeholder="Название" />
                  <Input type="text" name="company" placeholder="Предприятие" />
                  <Input type="text" name="first_name" placeholder="Имя" />
                  <Input type="text" name="last_name" placeholder="Фамилия" />
                </Col>
                <Col>
                  <Input type="email" name="email" placeholder="E-mail" />
                  <Input
                    type="tel"
                    name="phone_number"
                    placeholder="Номер телефона"
                  />
                  <Input type="password" name="password" placeholder="Пароль" />
                  <Select
                    value={values.role}
                    style={{ width: 218, marginBottom: '21px' }}
                    onChange={(value) => setFieldValue('role', value)}
                  >
                    <Option value="1">Я стейкхолдер</Option>
                    <Option value="2">Я заказчик</Option>
                    <Option value="3">Я бизнец-инициатива</Option>
                  </Select>
                </Col>
              </Row>
              <Row justify="center">
                <Button type="submit" disabled={!(dirty && isValid)}>
                  Подтвердить
                </Button>
              </Row>
              <Row justify="center" mt="30px">
                <Link href="/login">Войти</Link>
              </Row>
            </Col>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
