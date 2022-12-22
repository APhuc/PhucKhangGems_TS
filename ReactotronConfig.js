import { NativeModules } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron from 'reactotron-react-native'

const scriptURL = NativeModules.SourceCode.scriptURL
const scriptHostname = scriptURL.split('://')[1].split(':')[0]

Reactotron
.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: scriptHostname })
  .useReactNative()
  .connect()

console.log = Reactotron.log