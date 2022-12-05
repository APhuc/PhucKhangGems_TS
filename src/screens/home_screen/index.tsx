import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'

import * as SplashScreen from 'expo-splash-screen'

import { useTailwind, } from 'tailwind-rn'

import { typeGetProduct, postApi, request } from '@networking'
import MemoizedListProductCard from './list_product_card'
import { useAppSelector } from '@reduxApp/hooks'
import { KeyboardDismiss } from '@components'
import SearchCard from './search_card'
import { urlApp } from '@constants'

export default function HomeScreen() {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const [appIsReady, setAppIsReady] = useState(false)
  const [dataListProduct, setDataListProduct] = useState<typeGetProduct[]>([])

  useEffect(() => {
    async function prepare() {
      try {
        await callApiGetProduct(1, '')
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const callApiGetProduct = async (page: number, text: string) => {
    request.getProduct.sotrang = page
    request.getProduct.timkiem = text
    const { result, error } = await postApi(urlApp.postUrl.getProduct, request.getProduct)
    if (!error) {
      if (result[0].IDSanPham) {
        setDataListProduct(request.getProduct.sotrang == 1 ? result : [...dataListProduct, ...result])
        console.log(result.length)
        return {
          isGetData: true,
          lengthData: result.length
        }
      }
      setDataListProduct([])
      return {
        isGetData: true,
        lengthData: 0
      }
    }
    return { isGetData: false }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <KeyboardDismiss>
      <View
        onLayout={onLayoutRootView}
        style={[tw('flex-1'), { backgroundColor: theme.BG_APP }]}>
        <SearchCard callApiGetData={callApiGetProduct} />

        <MemoizedListProductCard 
          data={dataListProduct}
          callApiGetData={callApiGetProduct} />
      </View>
    </KeyboardDismiss>
  )
}