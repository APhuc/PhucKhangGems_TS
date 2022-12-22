import { GestureResponderEvent, ViewStyle, Pressable  } from 'react-native'

interface PressOpacityProps {
  children: React.ReactNode
  style: ViewStyle
  press: (event: GestureResponderEvent) => void
  isDisable?: boolean
}

export default function PressOpacity(props: PressOpacityProps) {
  return (
    <Pressable
      disabled={props.isDisable ?? false}
      onPress={props.press}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1.0 },
        props.style
      ]}>{props.children}</Pressable>
  )
}