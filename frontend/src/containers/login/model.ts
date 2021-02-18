import { tokenChanged } from '@/src/features/common';
import { app } from '@/src/features/common';
import { LoginFormValues } from '.';
import { LoginResponse } from '@/src/api/account';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';
import { forward } from 'effector';
import Router from 'next/router'
import { alertCalled } from '@/src/features/alert/model';

export const formSubmitted = app.createEvent<LoginFormValues>();

const loginProccesing = app.createEffect<
  LoginFormValues,
  LoginResponse,
  Error
>();
export const loginFetching: Fetching<LoginResponse, Error> = createFetching(
  loginProccesing
);

forward({ from: formSubmitted, to: loginProccesing })

loginProccesing.use((data) => accountApi.login(data));

loginProccesing.done.watch(({ result: { access } }) => {
  tokenChanged(access);
  alertCalled({ kind: 'success', label: 'Вы успешно вошли!' })
  Router.push({ pathname: '/cabinet' }, undefined, { shallow: false });
});

