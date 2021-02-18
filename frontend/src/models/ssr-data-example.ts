import { getSSRDataExample } from "@/mock-server";
import { userApi } from "@/src/api/user";
import { createFetching, Fetching } from "@/src/lib/fetching";
import { Effect, forward } from "effector";
import { app, request } from "../features/common";

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

loadUsers.use(() => request("GET", '/api/test'));

$users
  .on(loadUsers.done, (users, { result }) => {
    console.log('res', result);
    return [...users, ...result]
  })
  .on(addUser, (users, user) => [...users, user])
  .watch((_) => {
    console.log(_)
  })




