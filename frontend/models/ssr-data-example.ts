import { getSSRDataExample } from "@/mock-server"
import app from "./app";

interface IData {
  title: string
}

export const $ssrData = app.createStore<IData>(Object({}))

export const getSSRDataExampleFx = app.createEffect<void, any, Error>()

getSSRDataExampleFx.use(async () => {
  return getSSRDataExample();
})

$ssrData.on(getSSRDataExampleFx.doneData, (_, data) => data)
$ssrData.watch((_) => {
  console.log(_)
})


