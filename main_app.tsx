import { SafeAreaView, StatusBar, Text } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

import { useTailwind } from 'tailwind-rn'

import { StackNavigator } from '@navigation'

SplashScreen.preventAutoHideAsync()

export default function MainApp() {
  const tw = useTailwind()

  // const [appIsReady, setAppIsReady] = useState(false)

  // const pathFont = './assets/fonts/'

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync({
  //         'Nunito[200]': require(`${pathFont}Nunito-ExtraLight.ttf`),
  //         'Nunito[300]': require(`${pathFont}Nunito-Light.ttf`),
  //         'Nunito[400]': require(`${pathFont}Nunito-Regular.ttf`),
  //         'Nunito[500]': require(`${pathFont}Nunito-Medium.ttf`),
  //         'Nunito[600]': require(`${pathFont}Nunito-SemiBold.ttf`),
  //         'Nunito[700]': require(`${pathFont}Nunito-Bold.ttf`),
  //         'Nunito[800]': require(`${pathFont}Nunito-ExtraBold.ttf`),
  //         'Nunito[900]': require(`${pathFont}Nunito-Black.ttf`)
  //       })
  //       await new Promise(resolve => setTimeout(resolve, 2000))
  //     } catch (e) {
  //       console.warn(e)
  //     } finally {
  //       setAppIsReady(true)
  //     }
  //   }

  //   prepare()
  // }, [])

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [appIsReady])

  // if (!appIsReady) {
  //   return null
  // }
  
  return (
    <SafeAreaView 
      style={tw('flex-1 bg-black')}
      // onLayout={onLayoutRootView}
      >
      <StackNavigator />

      <StatusBar
        barStyle='light-content'
        backgroundColor='black' />
    </SafeAreaView>
  )
}
