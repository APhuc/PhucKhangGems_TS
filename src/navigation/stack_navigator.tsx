import { Pressable, Image } from 'react-native'

import { useFonts } from 'expo-font'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind, Style } from 'tailwind-rn'

import { RootStackScreenProps, RootStackParamList } from './type'
import { fontFamilyApp, urlApp, strApp } from '@constants'
import { HomeScreen } from '@screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function StackNavigator() {
  const pathFont = '../../assets/fonts/'

  const [fontsLoaded] = useFonts({
    'Nunito[200]': require(`${pathFont}Nunito-ExtraLight.ttf`),
    'Nunito[300]': require(`${pathFont}Nunito-Light.ttf`),
    'Nunito[400]': require(`${pathFont}Nunito-Regular.ttf`),
    'Nunito[500]': require(`${pathFont}Nunito-Medium.ttf`),
    'Nunito[600]': require(`${pathFont}Nunito-SemiBold.ttf`),
    'Nunito[700]': require(`${pathFont}Nunito-Bold.ttf`),
    'Nunito[800]': require(`${pathFont}Nunito-ExtraBold.ttf`),
    'Nunito[900]': require(`${pathFont}Nunito-Black.ttf`)
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Home' 
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} route={route} />,
          headerTitle: strApp.str_product,
          headerTitleStyle: { fontFamily: fontFamilyApp(7) },

        })} />
    </Stack.Navigator>
  )
}

const HeaderLeft = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const tw = useTailwind()

  const { logo } = styles(tw)

  const _onPress = () => navigation.navigate('Home')

  return (
    <Pressable onPress={_onPress}>
      <Image
        source={{ uri: urlApp.logoUrl }}
        style={logo} />
    </Pressable>
  )
}

const styles = (tw: (_classNames: string) => Style) => ({
  logo: [tw('w-10 h-10'), { resizeMode: 'contain'}]
})