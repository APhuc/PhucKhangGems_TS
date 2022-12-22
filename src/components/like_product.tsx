import { StyleProp, ViewStyle, Pressable } from 'react-native'

import { AntDesign } from '@expo/vector-icons'

import { useAppSelector, useAppDispatch } from '@reduxApp/hooks'
import { changeListLikeItem } from '@reduxApp/list_like_item'
import { postApi, request } from '@networking'
import { urlApp, scale } from '@constants'

type Props = {
  isLike: boolean
  styleContainer: StyleProp<ViewStyle>
  sizeIcon: number
  idProduct: number
  countLike: number
  productCode: string
}

const LikeProduct: React.FC<Props> = ({ isLike, styleContainer, sizeIcon, idProduct, countLike, productCode }) => {
  const theme = useAppSelector((state) => state.theme.value)
  const dispatch = useAppDispatch()

  const colorIcon = isLike ? theme.COLOR_TEXT_ERROR : theme.COLOR_ICON
  const nameIcon= isLike ? 'heart' : 'hearto'

  const _onPressLike = async () => {
    request.productHandling.yeuthich = isLike ? -1 : 1
    request.productHandling.idsanpham = idProduct
    const { error } = await postApi(urlApp.postUrl.productHandling, request.productHandling)
    if (!error) {
      dispatch(changeListLikeItem({
        idProduct: productCode,
        countLike: countLike,
        isRefresh: false
      }))
    }
  }

  return (
    <Pressable 
      style={styleContainer}
      onPress={_onPressLike} >
      <AntDesign
        name={nameIcon}
        size={scale(sizeIcon)}
        color={colorIcon} />
    </Pressable>
  )
}

export default LikeProduct