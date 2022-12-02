import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '@screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Home' 
        component={HomeScreen} />
    </Stack.Navigator>
  )
}