import { NavigationContainer } from '@react-navigation/native'
import {TailwindProvider} from 'tailwind-rn'
import utilities from './tailwind.json'

import MainApp from './main_app'

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <MainApp />
      </TailwindProvider>
    </NavigationContainer>
  )
}