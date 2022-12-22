import { Image, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { PressOpacity, MonneyText, AppText } from '@components'
import { strApp, urlApp, scale } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { typeGetProductCart } from '@networking'
import ButtonIcon from './button_icon'

type Props = {
  product: typeGetProductCart
  countProduct: number
  index: number
  pressDelete: (index: number, id: string) => void
  setlistIdItemCart: (id: string, name: string) => void
}

const ProductCart: React.FC<Props> = ({ product, countProduct, index, pressDelete, setlistIdItemCart }) => {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const titleNameStyle = [
    { color: theme.COLOR_TEXT_NAME },
    tw('text-base')
  ]
  const monneyStyle = tw('text-lg flex-1')
  const weightTextMonney = 7

  const _onPress = () => pressDelete(index, `${product.IDSanPham}`)

  return (
    <View 
      style={tw('bg-white flex-row py-3 pl-3 my-2')}
      key={`${product.IDSanPham}`} >
      <Image 
        source={{ uri: `${urlApp.serverUrl}${product.URLImage}` }}
        style={[
          { resizeMode: 'stretch' },
          tw('w-20 h-28')
        ]} />
      
      <View style={tw('pl-2 flex-1')}>
        <AppText
          style={titleNameStyle}
          numberOfLines={1}>
          {product.TenSanPham}
        </AppText>

        <AppText weight={5}>
          {product.MaSanPham}
        </AppText>

        {product.GiaSauGiam > 0 ?
          <MonneyText
            styleText={monneyStyle}
            decorationLine='underline'
            monney={product.GiaSauGiam}
            weight={weightTextMonney} /> :
          <AppText
            style={monneyStyle}
            weight={weightTextMonney}
          >{strApp.str_a_quote}</AppText>}
        
        <View style={[
          tw('flex-row items-center border-2 self-baseline rounded-full'),
          { borderColor: theme.COLOR_BORDER_COUNT }
        ]}>
          <ButtonIcon
            id={`${product.IDSanPham}`}
            name='minus'
            isDisable={countProduct == 1}
            setlistIdItemCart={setlistIdItemCart} />
          
          <View style={[
            tw('px-3 border-x-2'),
            { borderColor: theme.COLOR_BORDER_COUNT }
          ]}>
            <AppText>{countProduct}</AppText>
          </View>

          <ButtonIcon
            id={`${product.IDSanPham}`}
            name='plus'
            isDisable={countProduct >= product.SoLuongTrongKho}
            setlistIdItemCart={setlistIdItemCart} />
        </View>
      </View>
      
      <PressOpacity
        style={tw('pl-2')}
        press={_onPress}>
        <Ionicons 
          name='md-trash-outline'
          size={scale(20)}
          color={theme.COLOR_ICON} />
      </PressOpacity>
    </View>
  )
}

export default ProductCart