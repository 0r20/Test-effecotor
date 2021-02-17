import { app } from '@/src/features/common';
import { LoginFormValues } from '.';
import { LoginResponse } from '@/src/api/account';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';

export const loginProccesing = app.createEffect<
  LoginFormValues,
  LoginResponse,
  Error
>();
export const loginFetching: Fetching<LoginResponse, Error> = createFetching(
  loginProccesing
);

loginProccesing.use((data) => accountApi.login(data));

loginProccesing.done.watch(({ result: { access } }) => {
  console.log(JSON.stringify(access, null, 2));
});
