import { View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen'

import { useTailwind,  } from 'tailwind-rn'

import { typeGetProduct, postApi, request } from '@networking'
import { useAppSelector } from '@reduxApp/hooks'
import ListProductCard from './list_product_card'
import SearchCard from './search_card'
import { urlApp } from '@constants'

export default function HomeScreen() {
  const tw = useTailwind()
  
  const theme = useAppSelector((state) => state.theme.value)

  const [appIsReady, setAppIsReady] = useState(false)
  const [dataListProduct, setDataListProduct] = useState<[typeGetProduct] | null>(null)

  useEffect(() => {
    async function prepare() {
      try {
        const { result, error } = await postApi(urlApp.postUrl.getProduct, request.getProduct)
        if (!error) {
          setDataListProduct(result as [typeGetProduct])
        }
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View 
      onLayout={onLayoutRootView}
      style={[tw('flex-1'), { backgroundColor: theme.BG_APP }]}>
      <SearchCard />

      <ListProductCard data={dataListProduct}/>
    </View>
  )
}