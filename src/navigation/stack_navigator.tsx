import { Pressable, Image } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTailwind, Style } from 'tailwind-rn'

import { HomeScreen, DetailProductScreen, DetailCartScreen } from '@screens'
import { RootStackScreenProps, RootStackParamList } from './type'
import { fontFamilyApp, urlApp, strApp, scale } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function StackNavigator() {
  const pathFont = '../../assets/fonts/'

  const theme = useAppSelector((state) => state.theme.value)

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

  const headerTitleStyle = { fontFamily: fontFamilyApp(7) }

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen 
        name='Home' 
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} route={route} />,
          headerTitle: strApp.str_product,
          headerTitleStyle: headerTitleStyle,
          headerRight: () => <HeaderRight navigation={navigation} route={route} />
        })} />

      <Stack.Screen 
        name='DetailProduct' 
        component={DetailProductScreen}
        options={({ navigation, route }) => ({
          headerTitle: strApp.str_detail_product,
          headerTitleStyle: headerTitleStyle,
          headerRight: () => <HeaderRight navigation={navigation} route={route}/>,
          headerTintColor: theme.COLOR_ICON,
          headerBackTitleVisible: false
        })} />
      
      <Stack.Screen 
        name='DetailCart'
        component={DetailCartScreen}
        options={{
          headerTitle: strApp.str_detail_cart,
          headerTitleStyle: headerTitleStyle,
          headerTintColor: theme.COLOR_ICON,
          headerBackTitleVisible: false
        }} />
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

const HeaderRight = ({ navigation }: RootStackScreenProps<'Home' | 'DetailProduct'>) => {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const listIdItemCart = useAppSelector((state) => state.listIdItemCart.value)

  const _onPress = () => navigation.navigate('DetailCart')

  const countCart = Object.keys(listIdItemCart).length

  return (
    <Pressable 
      style={tw('flex-row items-center')}
      disabled={countCart < 1}
      onPress={_onPress} >
      <FontAwesome name='opencart' size={scale(24)} color={theme.COLOR_ICON} />

      <AppText
        style={[tw('text-base'), { color: theme.COLOR_TEXT_MONNEY }]}
        weight={8}
      >{countCart > 0 ? Object.values(listIdItemCart).reduce((t, n) => t + n) : ''}</AppText>
    </Pressable>
  )
}