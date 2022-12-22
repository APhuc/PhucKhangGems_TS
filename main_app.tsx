import { SafeAreaView, StatusBar, Text } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

import { useTailwind } from 'tailwind-rn'

import { StackNavigator } from '@navigation'

SplashScreen.preventAutoHideAsync()

export default function MainApp() {
  const tw = useTailwind()
  
  return (
    <SafeAreaView style={tw('flex-1 bg-black')}>
      <StackNavigator />

      <StatusBar
        barStyle='light-content'
        backgroundColor='black' />
    </SafeAreaView>
  )
}
