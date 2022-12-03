import { Pressable, StyleProp, TextStyle, View } from 'react-native'

import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { useAppSelector } from '@reduxApp/hooks'
import { typeGetProduct } from '@networking'
import { formatNumber } from '@handles'
import { AppText } from '@components'
import ImageItem from './image_item'
import { strApp, scale } from '@constants'

export default function ItemProductCard({ product }: { product: typeGetProduct }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const monneyStyle = [tw('text-lg'), { color: theme.COLOR_TEXT_MONNEY }]

  return (
    <View style={tw('w-full px-2 py-3')}>
      <Pressable style={{
        backgroundColor: theme.BG_SEARCH_PRODUCT,
        shadowColor: theme.COLOR_SHADOW,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 10,
        overflow: "hidden"
      }}>
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
              >{strApp.str_a_quote}
              </AppText>
            }

            <View style={tw('py-1 flex-row')}>
              <Pressable style={tw('mr-3')}>
                <AntDesign
                  name='hearto'
                  size={scale(20)}
                  color='black'
                />
              </Pressable>

              <Pressable>
                <FontAwesome5
                  name='cart-plus'
                  size={scale(20)}
                  color='black'
                />
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