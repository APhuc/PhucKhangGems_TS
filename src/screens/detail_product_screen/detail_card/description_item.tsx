import { TextStyle, StyleProp, Image, View } from 'react-native'

import RenderHtml from 'react-native-render-html'
import { useTailwind } from 'tailwind-rn'

import { MonneyText, BuyProduct, AppText } from '@components'
import { IntWeight, urlApp, strApp, width, scale } from '@constants'
import { typeGetDetailProduct } from '@networking'
import { useAppSelector } from '@reduxApp/hooks'

export default function DescriptionItem({ product, idProduct } : { product: typeGetDetailProduct, idProduct: number }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const listIdItemCart = useAppSelector((state) => state.listIdItemCart.value)

  const styleTextMonney = [
    tw('text-lg'),
    { color: theme.COLOR_TEXT_MONNEY }
  ]

  return (
    <View style={tw('mx-5 mt-4')}>
      <AppText
        style={tw('text-xl')}
        weight={8}
      >{product.TenSanPham}</AppText>

      <View style={tw('flex-row mt-1 items-center')}>
        <View style={tw('flex-row items-end')}>
          {product.GiamGia > 0 &&
            <MonneyText
              styleText={tw('text-base line-through')}
              decorationLine='line-through'
              monney={product.GiaBan}
              weight={4} />}

          {product.GiaSauGiam > 0 ?
            <MonneyText
              styleText={styleTextMonney}
              decorationLine='no-underline'
              monney={product.GiaSauGiam}
              weight={7} /> :
            <AppText
              style={styleTextMonney}
              weight={7}
            >{strApp.str_a_quote}</AppText>}
        </View>
        
        <View style={[
          tw('p-2 rounded-full ml-3'),
          { backgroundColor: theme.BG_SEARCH_PRODUCT }
        ]}>
          <BuyProduct
            isBuy={listIdItemCart[`${idProduct}`]}
            sizeIcon={16}
            idProduct={idProduct} />
        </View>
      </View>

      {product.MoTa && 
        <View style={tw('mt-2 mb-1')}>
          <AppText
            style={tw('text-xl')}
            weight={8}
          >{strApp.str_product_description}</AppText>
          
          <RenderHtml
            contentWidth={width - scale(12)}
            source={{html: product.MoTa}} />
        </View>}
      
      <View style={tw('items-center mt-5')}>
        <AppText
          style={[
            tw('text-xl'),
            { color: theme.COLOR_TEXT_MONNEY }
          ]}
          weight={8}
        >{strApp.str_name_store}</AppText>

        <TextAddress
          styleText={{}}
          weight={6}
          title={strApp.str_address_showroom}
          text={product.DiaChiCuaHang} />

        <TextAddress
          styleText={tw('underline')}
          weight={7}
          title={strApp.str_phone}
          text={product.DienThoaiCuaHang} />

        <TextAddress
          styleText={tw('underline')}
          weight={7}
          title={strApp.str_email}
          text={product.EmailCuaHang} />
        
        <Image
          source={{ uri: urlApp.logoTextUrl }}
          style={[
            tw('h-14 w-full mt-2 mb-5'),
            { resizeMode: 'contain' }
          ]} />
      </View>
    </View>
  )
}

const TextAddress = ({ styleText, weight, title, text } : { styleText: StyleProp<TextStyle>, weight: IntWeight, title: String, text: String }) => {
  const tw = useTailwind()

  return (
    <AppText style={tw('text-base')}>
      {title}: {' '}
      <AppText
        style={styleText}
        weight={weight}
      >{text}</AppText>
    </AppText>
  )
}