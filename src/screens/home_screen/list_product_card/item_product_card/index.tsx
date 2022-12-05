import { Pressable, StyleProp, TextStyle, View } from 'react-native'
import { useEffect, useState } from 'react'

import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { useAppSelector, useAppDispatch } from '@reduxApp/hooks'
import { typeGetProduct, postApi, request } from '@networking'
import { changeCartQuantity } from '@reduxApp/cart_quantity'
import { strApp, urlApp, scale } from '@constants'
import { formatNumber } from '@handles'
import { AppText } from '@components'
import ImageItem from './image_item'
import modelApp from '@modelApp'

export default function ItemProductCard({ product }: { product: typeGetProduct }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const cartQuantity = useAppSelector((state) => state.cartQuantity.value)

  const dispatch = useAppDispatch()

  const [isLike, setIsLike] = useState(false)
  const [isBuy, setIsBuy] = useState(false)

  const idStorage = `${product.IDSanPham}_storage`

  useEffect(() => {
    setIsLike(modelApp.objectLikeId[idStorage] ? true : false)
    setIsBuy(cartQuantity[idStorage] ? true : false)
  }, [])
  
  const _onPressLike = async () => {
    let countLikeProduct : 1 | -1
    if (!isLike) {
      modelApp.objectLikeId[idStorage] = product.SoLuongYeuThich + 1
      product.SoLuongYeuThich++
      countLikeProduct = 1
    } else {
      delete modelApp.objectLikeId[idStorage]
      product.SoLuongYeuThich--
      countLikeProduct = -1
    }
    request.productHandling.yeuthich = countLikeProduct
    request.productHandling.idsanpham = product.IDSanPham
    const { error } = await postApi(urlApp.postUrl.productHandling, request.productHandling)
    if (!error) {
      setIsLike(!isLike)
    }
  }

  const _onPressBuy = async () => {
    let cartQuantityProduct = {...cartQuantity}
    if (!isBuy) {
      cartQuantityProduct[idStorage] = product.IDSanPham
    } else {
      delete cartQuantityProduct[idStorage]
    }
    dispatch(changeCartQuantity(cartQuantityProduct))
    setIsBuy(!isBuy)
  }

  const colorIconLike = isLike ? theme.COLOR_TEXT_ERROR : theme.COLOR_ICON
  const nameIconLike = isLike ? 'heart' : 'hearto'

  const colorIconCart = isBuy ? theme.COLOR_TEXT_MONNEY : theme.COLOR_ICON

  const monneyStyle = [tw('text-lg'), { color: theme.COLOR_TEXT_MONNEY }]

  return (
    <View style={tw('w-full px-2 py-3')}>
      <Pressable style={[
        tw('rounded-md'),
        {
          backgroundColor: theme.BG_SEARCH_PRODUCT,
          shadowColor: theme.COLOR_SHADOW,
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          overflow: 'hidden'
        }
      ]}>
        <ImageItem url={product.URLImage} />

        <View style={tw('px-1')}>
          <AppText
            style={tw('text-sm mt-2')}
            weight={8}>
            {product.TenSanPham}
          </AppText>

          <View style={{ alignItems: 'flex-end' }}>
            {product.GiamGia > 0 &&
              <MonneyText
                styleText={[tw('text-sm line-through'), { color: theme.COLOR_TEXT_MONNEY_THROUGH}]}
                decorationLine='line-through'
                monney={product.GiaBan} />
            }

            {product.GiaSauGiam > 0 ?
              <MonneyText
                styleText={monneyStyle}
                decorationLine='underline'
                monney={product.GiaSauGiam} /> :
              <AppText
                style={monneyStyle}
                weight={8}
              >{strApp.str_a_quote}</AppText>
            }

            <View style={tw('py-2 flex-row items-center')}>
              <AppText
                style={monneyStyle}
                weight={8}
              >{product.SoLuongYeuThich}</AppText>

              <Pressable 
                style={tw('mr-3')}
                onPress={_onPressLike} >
                <AntDesign
                  name={nameIconLike}
                  size={scale(20)}
                  color={colorIconLike} />
              </Pressable>

              <Pressable onPress={_onPressBuy}>
                <FontAwesome5
                  name='cart-plus'
                  size={scale(20)}
                  color={colorIconCart} />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const MonneyText = ({ styleText, decorationLine, monney }: { styleText: StyleProp<TextStyle>, decorationLine: String, monney: number}) => {
  const tw = useTailwind()

  return (
    <AppText
      style={styleText}
      weight={8} >
      {formatNumber(monney)}{' '}
      <AppText
        style={tw(`${decorationLine}`)}
        weight={8}
      >đ</AppText>
    </AppText>
  )
}