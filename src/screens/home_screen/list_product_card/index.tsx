import { NativeScrollEvent, ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native'
import { useCallback, useEffect, useState, useRef, memo } from 'react'

import { useTailwind } from 'tailwind-rn'

import { guidelineBaseWidth, verticalScale, strApp, width } from '@constants'
import MemoizedItemProductCard from './item_product_card'
import { typeGetProduct, request } from '@networking'
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

const isBottom = (nativeEvent: NativeScrollEvent) => {
  const { layoutMeasurement,  contentOffset, contentSize } = nativeEvent
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - verticalScale(1)
}

const ListProductCard: React.FC<Props> = ({
  data, callApiGetData
}) => {
  const tw = useTailwind()

  const scrollRef = useRef<ScrollView>(null)

  const theme = useAppSelector((state) => state.theme.value)
  const listLikeItem = useAppSelector((state) => state.listLikeItem.value)
  const listIdItemCart = useAppSelector((state) => state.listIdItemCart.value)

  const numColumns = Math.ceil(width / guidelineBaseWidth) > 1 ? Math.ceil(width / guidelineBaseWidth) : 2

  const [refreshing, setRefreshing] = useState(false)
  const [scroll, setScroll] = useState({
    isScroll: false,
    hasReachedMax: false
  })

  const _onRefresh = useCallback(async () => {
    setRefreshing(true)
    const { isGetData } = await callApiGetData(1, request.getProduct.timkiem)
    setRefreshing(!isGetData)
  }, [refreshing])

  const _onScroll = async ({ nativeEvent } : { nativeEvent: NativeScrollEvent }) => {
    const { isScroll, hasReachedMax } = scroll
    if (isBottom(nativeEvent) && !isScroll && !hasReachedMax) {
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
        } else {
          setScroll({
            isScroll: false,
            hasReachedMax: false
          })
        }
      }
    }
  }

  useEffect(() => {
    if (data.length > 0 && data.length <= 10) {
      setScroll({
        isScroll: false,
        hasReachedMax: false
      })
      if (!refreshing) {
        scrollRef.current?.scrollTo({
          y : 0,
          animated : true
        })
      }
    }
  }, [data])

  if (data.length > 0) {
    return (
      <>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={tw('w-full px-5')}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
            />
          }
          scrollEventThrottle={16}
          onScroll={_onScroll}>
          <View style={tw('flex-row')}>
            {Array.from(Array(numColumns)).map((_, colIndex) => (
              <View style={tw('flex-1')} key={`column_${colIndex}`}>
                {data
                  .filter((_, index) => index % numColumns === colIndex)
                  .map(product => (
                    <MemoizedItemProductCard
                      product={product}
                      isBuy={listIdItemCart[`${product.IDSanPham}`]}
                      like={listLikeItem[product.MaSanPham]}
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

function ListProductCardPropsAreEqual(prevProp: Readonly<Props>, nextProp:  Readonly<Props>) {
  return prevProp.data == nextProp.data
}
const MemoizedListProductCard = memo(ListProductCard, ListProductCardPropsAreEqual)

export default MemoizedListProductCard