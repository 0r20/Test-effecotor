import React, { FormEvent, InputHTMLAttributes, useMemo } from 'react';
// import { Input } from '@/src/ui/molecules/input';
import { Container } from '@/src/ui/organisms';
import { Col, Row } from '@/src/lib/styled-components-layout';
import { Box, H3, Button, Link } from '@/src/ui/atoms';
import { loginFetching, loginForm } from './model';
import { useStore } from 'effector-react/ssr';
import { useField, useForm } from 'effector-forms';
import styled from '@emotion/styled';
import { Field } from 'effector-forms/dist/types';

export const LoginContainer = () => {
  const { submit, eachValid, isDirty } = useForm(loginForm);
  const isLoading = useStore(loginFetching.isLoading);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Container>
      <Box>
        <H3 center>Логин</H3>
        <form onSubmit={onSubmit}>
          <Col align="center">
            <Input
              field={loginForm.fields.email}
              type="email"
              placeholder="Введите Email"
            />
            <Input
              field={loginForm.fields.password}
              type="password"
              placeholder="Введите пароль"
            />
            <Button
              type="submit"
              disabled={isLoading || !eachValid || !isDirty}
            >
              Войти
            </Button>
            <Row justify="center" mt="30px">
              <Link href="/register">Зарегистрироваться</Link>
            </Row>
          </Col>
        </form>
      </Box>
    </Container>
  );
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  field: Field<any>;
};

const Input: React.FC<InputProps> = ({ width, field, ...props }) => {
  const { value, onChange, isTouched, firstError, name } = useField(field);

  const isShowError = useMemo(() => isTouched && !!firstError, [
    isTouched,
    firstError,
  ]);

  return (
    <Wrapper width={width}>
      <Inner
        {...props}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isShowError={isShowError}
      />
      {isShowError && <Error>{firstError}</Error>}
    </Wrapper>
  );
};

export const Inner = styled.input<{ isShowError?: boolean }>`
  border: 1px solid
    ${({ isShowError }) => (isShowError ? 'red' : 'rgba(0, 0, 0, 0.1)')};
  padding: 14px 23px;
  background-color: #fff;
  color: #000;
  opacity: 1;
  border-radius: 10px;
  outline: none;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  ::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    opacity: 0.5;
  }
`;

export const Wrapper = styled.div<{ width?: string }>`
  position: relative;
  margin-bottom: 21px;
  ${Inner} {
    width: ${({ width }) => (width ? width : '218px')};
  }
`;

export const Error = styled.small`
  position: absolute;
  bottom: -16px;
  left: 0;
  color: red;
  font-size: 10px;
`;
