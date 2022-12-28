import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'

import * as SplashScreen from 'expo-splash-screen'
import { useTailwind } from 'tailwind-rn'

import { typeGetProduct, postApi, request } from '@networking'
import MemoizedListProductCard from './list_product_card'
import { KeyboardDismiss, SearchCard } from '@components'
import { useAppSelector } from '@reduxApp/hooks'
import { strApp, urlApp } from '@constants'

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
        return {
          isGetData: true,
          lengthData: result.length
        }
      } else {
        if (request.getProduct.sotrang == 1) {
          setDataListProduct([])
        }
      }
      return {
        isGetData: true,
        lengthData: 0
      }
    }
    return { isGetData: false }
  }

  const _onSearch = async (text: string) => callApiGetProduct(1, text)

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
        style={{ flex: 1, backgroundColor: theme.BG_APP }}>
        <View style={tw('my-2.5 mx-5')}>
          <SearchCard 
            onSearch={_onSearch}
            placeholder={`${strApp.str_search}......`} />
        </View>

        <MemoizedListProductCard 
          data={dataListProduct}
          callApiGetData={callApiGetProduct} />
      </View>
    </KeyboardDismiss>
  )
}