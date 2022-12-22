import { Pressable } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'

import { changeListIdItemCart } from '@reduxApp/list_id_item_cart'
import { useAppSelector, useAppDispatch } from '@reduxApp/hooks'
import { scale } from '@constants'

type Props = {
  isBuy: number
  sizeIcon: number
  idProduct: number
}

const BuyProduct: React.FC<Props> = ({ isBuy, sizeIcon, idProduct }) => {
  const theme = useAppSelector((state) => state.theme.value)
  const dispatch = useAppDispatch()

  const colorIconCart = isBuy ? theme.COLOR_TEXT_MONNEY : theme.COLOR_ICON

  const _onPressBuy = () => dispatch(changeListIdItemCart({
    idProduct: `${idProduct}`,
    action: isBuy ? 'delete' : 'decrement'
  }))

  return (
    <Pressable onPress={_onPressBuy}>
      <FontAwesome5
        name='cart-plus'
        size={scale(sizeIcon)}
        color={colorIconCart} />
    </Pressable>
  )
}

export default BuyProduct