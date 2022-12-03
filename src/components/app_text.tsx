import { TextProps, Text } from 'react-native'

import { fontFamilyApp, IntWeight } from '@constants'

interface AppTextProps extends TextProps {
  weight?: IntWeight
}

export default function AppText(props: AppTextProps) {
  const { weight = 4 } = props

  return <Text {...props} style={[props.style, { fontFamily: fontFamilyApp(weight) }]} />
}