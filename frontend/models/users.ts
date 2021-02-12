import { IUser } from './../utils/types/user';
import root from './root';

export const $users = root.createStore<IUser[]>([
  { id: 1, name: "John" }
]);

export const update = root.createEvent<IUser>();

const updateStore = (state: IUser[], data: IUser) => {
  const userIndex = state.findIndex((user) => user.id === data.id);

  if (userIndex > -1) {
    state.splice(userIndex, 1, data);
  } else {
    state.push(data);
  }

  return [...state];
};

$users
  .on(update, updateStore);