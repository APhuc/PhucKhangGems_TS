import { Pressable, Image } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind, Style } from 'tailwind-rn'

import { RootStackScreenProps, RootStackParamList } from './type'
import { fontFamilyApp, urlApp, strApp, scale } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { HomeScreen } from '@screens'
import { AppText } from '@components'

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
          headerRight: () => <HeaderRight />
        })} />
    </Stack.Navigator>
  )
}

const HeaderLeft = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const tw = useTailwind()

  const _onPress = () => navigation.navigate('Home')

  return (
    <Pressable onPress={_onPress}>
      <Image
        source={{ uri: urlApp.logoUrl }}
        style={[tw('w-10 h-10'), { resizeMode: 'contain'}]} />
    </Pressable>
  )
}

const HeaderRight = () => {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const cartQuantity = useAppSelector((state) => state.cartQuantity.value)

  return (
    <Pressable style={tw('flex-row items-center')}>
      <FontAwesome name='opencart' size={scale(24)} color={theme.COLOR_ICON} />

      <AppText
        style={[tw('text-base'), { color: theme.COLOR_TEXT_MONNEY }]}
        weight={8}
      >{Object.keys(cartQuantity).length}</AppText>
    </Pressable>
  )
}