import { ScrollView } from 'react-native'
import { useState } from 'react'

import { RootStackScreenProps } from '@navigation'
import { useAppSelector } from '@reduxApp/hooks'
import DetailCart from './detail_card'

export default function DetailProductScreen({ route }: RootStackScreenProps<'DetailProduct'>) {
  const { idProduct, countLike } = route.params

  const theme = useAppSelector((state) => state.theme.value)

  const [idDetailProduct, setIdDetailProduct] = useState(idProduct)

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.BG_APP }}
      showsVerticalScrollIndicator={false}>
      <DetailCart idProduct={idDetailProduct} countLike={countLike}/>
    </ScrollView>
  )
}