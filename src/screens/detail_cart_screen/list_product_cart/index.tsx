import { useLayoutEffect } from 'react'
import { Alert } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ControllerRenderProps } from 'react-hook-form'
import { useTailwind } from 'tailwind-rn'

import { changeListIdItemCart } from '@reduxApp/list_id_item_cart'
import { typeGetProductCart, postApi, request } from '@networking'
import { useAppSelector, useAppDispatch } from '@reduxApp/hooks'
import { MonneyText, AppText } from '@components'
import { RootStackParamList } from '@navigation'
import TextHorizontal from './text_horizontal'
import { urlApp, strApp } from '@constants'
import ProductCart from './product_cart'
import { FormValues } from '../type'

export default function ListProductCart({ field, setValueProducts, deliveryCharges, setlistIdItemCart }: { field: ControllerRenderProps<FormValues, 'products'>, setValueProducts: React.Dispatch<React.SetStateAction<typeGetProductCart[]>>, deliveryCharges: number, setlistIdItemCart: (id: string, name: string) => void }) {
  const { value, onChange }= field

  const tw = useTailwind()

  const dispatch = useAppDispatch()
  const listIdItemCart = useAppSelector((state) => state.listIdItemCart.value)
  const theme = useAppSelector((state) => state.theme.value)

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DetailProduct', undefined>>()

  useLayoutEffect(() => {
    callApiGetCart()
  }, [])

  const callApiGetCart = async() => {
    const idItems = Object.keys(listIdItemCart)
    let idsanphams = ''
    idItems.map((id, index) => {
      if (index < idItems.length - 1) {
        idsanphams += (id + ',')
      } else {
        idsanphams += id
      }
    })
    request.getCart.idsanphams = idsanphams
    const { result, error } = await postApi(urlApp.postUrl.getProduct, request.getCart)
    if (!error) {
      onChange(result)
      setValueProducts(result)
    }
  }

  if (value.length > 0) {
    const _pressDelete = (index: number, id: string) => {
      const arrProduct = [...value]
      arrProduct.splice(index, 1)
      dispatch(changeListIdItemCart({
        idProduct: id,
        action: 'delete'
      }))
      if (arrProduct.length > 0) {
        onChange(arrProduct)
        setValueProducts(arrProduct)
      } else {
        navigation.goBack()
      }
    }

    const _onQuestion = (index: number, id: string) => {
      Alert.alert(
        strApp.str_notification,
        strApp.str_question_remove_product,
        [
          { text: strApp.str_yes, onPress: () => _pressDelete(index, id) },
          { text: strApp.str_cancel, style: 'destructive' }
        ],
        { cancelable: false }
      )
    }

    const grossProduct = Object.values(listIdItemCart).reduce((t, n) => t + n)

    let cost = 0

    value.map(product => cost += (product.GiaSauGiam * listIdItemCart[`${product.IDSanPham}`]))
    
    return (
      <>
        {value.map((product, index) => {
          if (product) {
            return (
              <ProductCart 
                key={`${index}`}
                product={product} 
                countProduct={listIdItemCart[`${product.IDSanPham}`]} 
                index={index} 
                pressDelete={_onQuestion}
                setlistIdItemCart={setlistIdItemCart} />
            )
          }
        })}

        <TextHorizontal title={strApp.str_gross_product}>
          <AppText style={[
            tw('text-lg'),
            { color: theme.COLOR_TEXT_NAME }
          ]}>
            {grossProduct} {strApp.str_product.toLowerCase()}
          </AppText>
        </TextHorizontal>

        <TextHorizontal title={strApp.str_provisional}>
          <MonneyText
            styleText={[
              tw('text-lg'),
              { color: theme.COLOR_TEXT_NAME }
            ]}
            decorationLine='underline'
            monney={cost}
            weight={7} />
        </TextHorizontal>

        <TextHorizontal title={strApp.str_delivery_charges}>
          <MonneyText
            styleText={[
              tw('text-lg'),
              { color: theme.COLOR_TEXT_NAME }
            ]}
            decorationLine='underline'
            monney={deliveryCharges}
            weight={7} />
        </TextHorizontal>
      </>
    )
  }

  return null  
}