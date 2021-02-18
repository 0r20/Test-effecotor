import { app } from '@/src/features/common'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { sample } from 'effector'
import { IUser } from '@/src/types/user'
import { createFetching, Fetching } from '@/src/lib/fetching'
import { accountApi } from '@/src/api/account'

// const SESSION_TIME = 24 * 3600 * 1000
const SESSION_TIME = 1 * 30 * 1000

const TOKEN_ID = "access-token"
const DATE_ID = "expiration-date"
const CURRENT_ACCOUNT = "current-account"

export const tokenChanged = app.createEvent<string>()
const tokenDropped = app.createEvent<void>()
export const logout = app.createEvent<void>()
const checkAuthTimout = app.createEvent<number>()
export const chechAuthState = app.createEvent<void>()

const currentUserProccessing = app.createEffect<void, IUser, Error>()
export const userFetching: Fetching<IUser, Error> = createFetching(currentUserProccessing)

export const $token = app.createStore<string>(Cookie.get(TOKEN_ID) ?? null)
export const $isAuthenticated = $token.map((token) => !!token)
const $expirationDate = app.createStore<Date>(!!parseCookie<Date>(DATE_ID) && new Date(parseCookie<Date>(DATE_ID)))
export const $currentUser = app.createStore<IUser>(parseCookie<IUser>(CURRENT_ACCOUNT))

currentUserProccessing.use(() => accountApi.getInfo())

currentUserProccessing.done.watch(() => Router.push({ pathname: '/cabinet' }, undefined, { shallow: true }));

$currentUser
  .on(currentUserProccessing.done, (_, { result: user }) => {
    console.log('user', user)
    return user
  })

$token
  .on(tokenChanged, (_, token) => token)
  .reset(tokenDropped)

tokenChanged.watch(() => {
  currentUserProccessing()
  checkAuthTimout(SESSION_TIME)
})

$expirationDate.on(tokenChanged, () => new Date(new Date().getTime() + SESSION_TIME))

checkAuthTimout.watch((expirationTime) => setTimeout(() => logout(), expirationTime))

logout.watch(() => {
  tokenDropped();
  Router.push({ pathname: '/' }, undefined, { shallow: true });
});

// Check Auth state
sample({
  source: { $token, $expirationDate },
  clock: chechAuthState,
  fn: ({ $token: token, $expirationDate: expirationDate }) => {
    if (!token) {
      logout();
    } else {
      if (expirationDate <= new Date()) {
        logout();
      } else {
        checkAuthTimout(expirationDate.getTime() - new Date().getTime());
      }
    }
  }
})

// Set to Cookies
$token.watch((token) => {
  if (token) {
    Cookie.set(TOKEN_ID, token)
  }
})

tokenDropped.watch(() => {
  Cookie.remove(TOKEN_ID)
  Cookie.remove(DATE_ID)
  Cookie.remove(CURRENT_ACCOUNT)
})

$expirationDate.watch((date) => {
  if (date) {
    Cookie.set(DATE_ID, JSON.stringify(date))
  }
})

$currentUser.watch((user) => {
  if (user) {
    Cookie.set(CURRENT_ACCOUNT, JSON.stringify(user))
  }
})

function parseCookie<T>(key: string): (T | null) {
  if (Cookie.get(key) === undefined || Cookie.get(key) === null) {
    return null
  } else {
    return JSON.parse(Cookie.get(key))
  }
}