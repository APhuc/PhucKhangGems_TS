import { Pressable, View } from 'react-native'
import { useEffect, memo } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useTailwind } from 'tailwind-rn'

import { LikeProduct, BuyProduct, MonneyText, AppText } from '@components'
import { changeListLikeItem, typeLike } from '@reduxApp/list_like_item'
import { useAppSelector, useAppDispatch } from '@reduxApp/hooks'
import { RootStackParamList } from '@navigation'
import { typeGetProduct } from '@networking'
import ImageItem from './image_item'
import { strApp } from '@constants'

type Props = {
  product: typeGetProduct
  isBuy: number
  like: typeLike
}

const ItemProductCard: React.FC<Props> = ({ product, isBuy, like }) => {
  const tw = useTailwind()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home', undefined>>()

  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme.value)

  const _onPressProduct = () => navigation.navigate('DetailProduct', { idProduct: product.IDSanPham, countLike: product.SoLuongYeuThich })

  const monneyStyle = [tw('text-lg'), { color: theme.COLOR_TEXT_MONNEY }]

  const weightText = 8
  const heightIcon = 20

  useEffect(() => {
    if (like && product.SoLuongYeuThich != like.countLike) {
      dispatch(changeListLikeItem({
        idProduct: product.MaSanPham,
        countLike: product.SoLuongYeuThich,
        isRefresh: true
      }))
    }
  }, [product.SoLuongYeuThich])

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
      ]}
      onPress={_onPressProduct} >
        <ImageItem url={product.URLImage} />

        <View style={tw('px-1')}>
          <AppText
            style={tw('text-sm mt-2')}
            weight={weightText}>
            {product.TenSanPham}
          </AppText>

          <View style={{ alignItems: 'flex-end' }}>
            {product.GiamGia > 0 &&
              <MonneyText
                styleText={[tw('text-sm line-through'), { color: theme.COLOR_TEXT_MONNEY_THROUGH}]}
                decorationLine='line-through'
                monney={product.GiaBan}
                weight={weightText} />}

            {product.GiaSauGiam > 0 ?
              <MonneyText
                styleText={monneyStyle}
                decorationLine='underline'
                monney={product.GiaSauGiam}
                weight={weightText} /> :
              <AppText
                style={monneyStyle}
                weight={weightText}
              >{strApp.str_a_quote}</AppText>}

            <View style={tw('py-2 flex-row items-center')}>
              <AppText
                style={monneyStyle}
                weight={weightText}
              >{like?.countLike ?? product.SoLuongYeuThich}</AppText>

              <LikeProduct 
                isLike={like?.isLike}
                styleContainer={tw('mr-3')}
                sizeIcon={heightIcon}
                idProduct={product.IDSanPham}
                countLike={product.SoLuongYeuThich}
                productCode={product.MaSanPham} />

              <BuyProduct
                isBuy={isBuy}
                sizeIcon={heightIcon}
                idProduct={product.IDSanPham} />
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

function ItemProductCardPropsAreEqual(prevProp: Readonly<Props>, nextProp:  Readonly<Props>) {
  return prevProp.product.IDSanPham == nextProp.product.IDSanPham
    && prevProp.product.SoLuongYeuThich == nextProp.product.SoLuongYeuThich
    && prevProp.product.GiaSauGiam == nextProp.product.GiaSauGiam
    && prevProp.product.GiaBan == nextProp.product.GiaBan
    && prevProp.product.URLImage == nextProp.product.URLImage
    && prevProp.isBuy == nextProp.isBuy
    && prevProp.like == nextProp.like
}
const MemoizedItemProductCard = memo(ItemProductCard, ItemProductCardPropsAreEqual)

export default MemoizedItemProductCard