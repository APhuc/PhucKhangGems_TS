import { Pressable, Keyboard } from 'react-native'

import { useTailwind } from 'tailwind-rn'

export default function KeyboardDismiss({ children } : { children: React.ReactNode }) {
  const tw = useTailwind()

  const _onPress = () => Keyboard.dismiss()

  return (
    <Pressable style={tw('flex-1')} onPress={_onPress}>
      { children }
    </Pressable>
  )
}