import { app } from '@/src/features/common';

type Kind = 'success' | 'warning' | 'error'

interface CallType {
  kind: Kind,
  label: string;
}

export const alertCalled = app.createEvent<CallType>();
export const alertClosed = app.createEvent();

export const $alertType = app.createStore<CallType>({
  kind: null,
  label: null
});

export const $alertKind = $alertType.map(({ kind }) => kind);
export const $alertLabel = $alertType.map(({ label }) => label);

$alertType
  .on(alertCalled, (_, data) => data)
  .reset(alertClosed)
