import { app } from '@/src/features/common';

type Kind = 'logout';

interface ModalType {
  kind: Kind;
  props: any;
}

export const modelOpened = app.createEvent<ModalType>()
export const modelClosed = app.createEvent<void>()

export const $modal = app.createStore<ModalType>({ kind: null, props: null })
export const $modalKind = $modal.map(({ kind }) => kind)
export const $modalProps = $modal.map(({ props }) => props)

$modal
  .on(modelOpened, (_, data) => data)
  .reset(modelClosed)