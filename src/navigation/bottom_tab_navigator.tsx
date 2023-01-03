import { Image } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { InformationScreen, HomeScreen, MyOrderScreen, AccountScreen } from '@screens'
import { fontFamilyApp, strApp, urlApp } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { RootTabParamList } from './type'
import HeaderRight from './header_right'

const BottomTab = createBottomTabNavigator<RootTabParamList>()

export default function BottomTabNavigator() {
  const theme = useAppSelector((state) => state.theme.value)
  const tw = useTailwind()

  const headerTitleStyle = { fontFamily: fontFamilyApp(7) }

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarLabelStyle: headerTitleStyle,
        tabBarStyle: { backgroundColor: theme.COLOR_ICON },
        tabBarActiveTintColor: theme.BG_APP,
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => {
          let name
          switch(route.name) {
            case 'Home':
              name = 'shopping-outline'
              break
            case 'MyOrder':
              name = 'inbox-full'
              break
            case 'Information':
              name = 'information-outline'
              break
            default:
              name = 'account-circle-outline'
              break
          }
          return (
            <TabBarIcon 
              name={name as React.ComponentProps<typeof MaterialCommunityIcons>['name']} 
              color={color} size={size} />
          )}})}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarLabel: strApp.str_store,
          headerTitle: strApp.str_store,
          headerTitleStyle: headerTitleStyle,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => {
            const pressCart = () => navigation.navigate('DetailCart')

            return <HeaderRight press={pressCart} style={tw('mr-3')}/>}
        })} />
      
      <BottomTab.Screen
        name='MyOrder'
        component={MyOrderScreen}
        options={{ 
          tabBarLabel: strApp.str_invoice,
          headerTitle: strApp.str_invoice
        }} />
      
      <BottomTab.Screen
        name='Information'
        component={InformationScreen}
        options={{ 
          tabBarLabel: strApp.str_information,
          headerTitle: strApp.str_information
        }} />
      
      {/* <BottomTab.Screen
        name='Account'
        component={AccountScreen}
        options={{ 
          tabBarLabel: strApp.str_account,
          headerShown: false
        }} /> */}
    </BottomTab.Navigator>
  )
}

const HeaderLeft = () => {
  const tw = useTailwind()

  return (
    <Image
      source={{ uri: urlApp.logoUrl }}
      style={[tw('w-10 h-10 ml-3'), { resizeMode: 'contain'}]} />
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
  size: number
}) {
  return <MaterialCommunityIcons {...props} />
}