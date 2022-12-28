import { Pressable, StyleProp, ViewStyle } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'
import { scale } from '@constants'

export default function HeaderRight({ press, style } : { press: () => void, style?: StyleProp<ViewStyle> }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const listIdItemCart = useAppSelector((state) => state.listIdItemCart.value)

  const countCart = Object.keys(listIdItemCart).length

  return (
    <Pressable 
      style={[tw('flex-row items-center'), style]}
      disabled={countCart < 1}
      onPress={press} >
      <FontAwesome name='opencart' size={scale(24)} color={theme.COLOR_ICON} />

      <AppText
        style={[tw('text-base'), { color: theme.COLOR_TEXT_MONNEY }]}
        weight={8}
      >{countCart > 0 ? Object.values(listIdItemCart).reduce((t, n) => t + n) : ''}</AppText>
    </Pressable>
  )
}