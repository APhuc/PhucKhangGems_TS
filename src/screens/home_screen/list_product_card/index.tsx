import { ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native'
import { useCallback, useState, memo, useEffect, useLayoutEffect } from 'react'

import { useTailwind } from 'tailwind-rn'

import { guidelineBaseWidth, strApp, width, height } from '@constants'
import { typeGetProduct, request } from '@networking'
import ItemProductCard from './item_product_card'
import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from 'components'

type Props = {
  data: typeGetProduct[]
  callApiGetData: (page: number, text: string) => Promise<{
    isGetData: boolean;
    lengthData: any;
  } | {
    isGetData: boolean;
    lengthData?: undefined;
  }>
}
const ListProductCard: React.FC<Props> = ({
  data, callApiGetData
}) => {
  const tw = useTailwind()
  const [numColumns, setNumColumns] = useState(2)
  const theme = useAppSelector((state) => state.theme.value)

  // const numColumns = Math.ceil(width / guidelineBaseWidth);
  useLayoutEffect(() => {
    const numDefault = Math.ceil(width / guidelineBaseWidth);
    if (numDefault !== 1) {
      setNumColumns(numDefault)
    } else {
      setNumColumns(2)
    }
  }, [width])

  const [refreshing, setRefreshing] = useState(false)
  const [scroll, setScroll] = useState({
    isScroll: false,
    hasReachedMax: false
  })

  const _onRefresh = useCallback(async () => {
    setRefreshing(true)
    const { isGetData } = await callApiGetData(1, request.getProduct.timkiem)
    setRefreshing(!isGetData)
  }, [])

  const _onMomentumScrollEnd = useCallback(async () => {
    const { isScroll, hasReachedMax } = scroll
    if (!isScroll && !hasReachedMax) {
      setScroll({
        isScroll: true,
        hasReachedMax: false
      })
      if (data.length % request.getProduct.soitem == 0) {
        const { isGetData, lengthData } = await callApiGetData(data.length / request.getProduct.soitem + 1, request.getProduct.timkiem)
        setScroll({
          isScroll: !isGetData,
          hasReachedMax: !(lengthData == request.getProduct.soitem)
        })
      }
    }
  }, [scroll, data])

  if (data.length > 0) {
    return (
      <>
        <ScrollView
          contentContainerStyle={tw('w-full px-5')}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
            />
          }
          onMomentumScrollEnd={_onMomentumScrollEnd}>
          <View style={tw('flex-row')}>
            {Array.from(Array(numColumns)).map((_, colIndex) => (
              <View style={tw('flex-1')} key={`column_${colIndex}`}>
                {data
                  .filter((_, index) => index % numColumns === colIndex)
                  .map(product => (
                    <ItemProductCard
                      product={product}
                      key={`${product.IDSanPham}`} />
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {scroll.isScroll && <ActivityIndicator />}
      </>
    )
  }

  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <AppText
        style={{ color: theme.COLOR_TEXT_ERROR }}
        weight={8}
      >{strApp.str_non_data_product}</AppText>
    </View>
  )
}

function ListProductCardPropsAreEqual(prevProp: Readonly<Props>, nextProp: Readonly<Props>) {
  return prevProp.data == nextProp.data
}
const MemoizedListProductCard = memo(ListProductCard, ListProductCardPropsAreEqual)

export default MemoizedListProductCard