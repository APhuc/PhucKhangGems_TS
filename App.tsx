import { NavigationContainer } from '@react-navigation/native'
import {TailwindProvider} from 'tailwind-rn'
import utilities from './tailwind.json'
import { Provider } from 'react-redux'

import { store } from '@reduxApp/store'
import MainApp from './main_app'


if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <MainApp />
        </TailwindProvider>
      </NavigationContainer>
    </Provider>
  )
}