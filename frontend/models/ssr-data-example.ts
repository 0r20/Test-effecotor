import { getSSRDataExample } from "@/mock-server"
import root from "./root";

interface IData {
  title: string
}

const $ssrData = root.createStore<IData>(Object({}))

const getSSRDataExampleFx = root.createEffect<void, any, Error>()

getSSRDataExampleFx.use(async () => {
  return getSSRDataExample();
})

$ssrData.on(getSSRDataExampleFx.doneData, (_, data) => data)

$ssrData.watch(data => {
  console.log('data', data);
})

export {
  getSSRDataExampleFx,
  $ssrData
}
