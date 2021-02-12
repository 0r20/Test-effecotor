import { IUser } from './../utils/types/user';
import app from "./app";

export const $users = app.createStore<IUser[]>([
  { id: 1, name: "Bar" }
]);

export const update = app.createEvent<IUser>();

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

