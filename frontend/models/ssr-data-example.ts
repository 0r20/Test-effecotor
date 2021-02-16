import { userApi } from "@/api/user";
import { createFetching, Fetching } from "@/lib/fetching";
import { Effect, forward } from "effector";
import app from "./app";

import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';

interface IUser {
  name: string;
}

export const pageMounted = app.createEvent();
export const addUser = app.createEvent<IUser>();

export const loadUsers: Effect<void, IUser[], Error> = app.createEffect();
export const usersFetching: Fetching<IUser[], Error> = createFetching(
  loadUsers,
  "initial"
);

forward({
  from: pageMounted,
  to: loadUsers
})

export const $users = app.createStore<IUser[]>([]);

loadUsers.use(() => userApi.getAll());

$users
  .on(loadUsers.done, (users, { result }) => [...users, ...result])
  .on(addUser, (users, user) => [...users, user])
  .watch((_) => {
    console.log(_)
  })




