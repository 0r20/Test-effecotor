import { app } from '@/src/features/common';
import { RegisterFormValues } from '.';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi, RegisterData } from '@/src/api/account';

export const registerProccesing = app.createEffect<
  RegisterFormValues,
  void,
  Error
>();
export const registerFetching: Fetching<void, Error> = createFetching(
  registerProccesing
);

registerProccesing.use((values) => accountApi.signup(formatRole(values)));

registerProccesing.done.watch(() => {
  console.log("На майл отправлено письмо");
});

const formatRole = (values: RegisterFormValues): RegisterData => {
  const data = { ...values };
  const is_steakholder = values.role === "1" || values.role === "2";
  delete data.role;
  return { ...data, is_steakholder }
}