import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'

import { DetailProductScreen, DetailCartScreen, ContactScreen, PolicyScreen } from '@screens'
import BottomTabNavigator from './bottom_tab_navigator'
import { fontFamilyApp, strApp } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { RootStackParamList } from './type'
import HeaderRight from './header_right'

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
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }} />

      <Stack.Screen 
        name='DetailProduct' 
        component={DetailProductScreen}
        options={({ navigation, route }) => ({
          headerTitle: strApp.str_detail_product,
          headerTitleStyle: headerTitleStyle,
          headerRight: () => {
            const pressCart = () => navigation.navigate('DetailCart')

            return <HeaderRight press={pressCart} />},
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
      
      <Stack.Screen 
        name='Contact'
        component={ContactScreen}
        options={{
          headerTitle: strApp.str_contact,
          headerTitleStyle: headerTitleStyle,
          headerTintColor: theme.COLOR_ICON,
          headerBackTitleVisible: false
        }} />
      
      <Stack.Screen 
        name='Policy'
        component={PolicyScreen}
        options={{
          headerTitle: strApp.str_policy,
          headerTitleStyle: headerTitleStyle,
          headerTintColor: theme.COLOR_ICON,
          headerBackTitleVisible: false
        }} />
    </Stack.Navigator>
  )
}