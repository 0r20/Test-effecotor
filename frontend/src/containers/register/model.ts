import { app } from '@/src/features/common';
import { RegisterFormValues } from '.';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';

export const registerProccesing = app.createEffect<
  RegisterFormValues,
  void,
  Error
>();
export const registerFetching: Fetching<void, Error> = createFetching(
  registerProccesing
);

const formatRegister = registerProccesing.map((values) => {
  const { role, ...data } = values;
  const is_steakholder = values.role === "1" || values.role === "2";
  return { ...data, is_steakholder }
})

formatRegister.watch((data) => accountApi.signup(data));

registerProccesing.done.watch(() => {
  console.log("На майл отправлено письмо");
});