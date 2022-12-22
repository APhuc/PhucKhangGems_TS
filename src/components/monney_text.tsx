import { StyleProp, TextStyle } from 'react-native'

import { useTailwind } from 'tailwind-rn'

import { formatNumber } from '@handles'
import { IntWeight } from '@constants'
import AppText from './app_text'

export default function MonneyText({ styleText, decorationLine, monney, weight }: { styleText: StyleProp<TextStyle>, decorationLine: String, monney: number, weight: IntWeight}) {
  const tw = useTailwind()

  return (
    <AppText
      style={styleText}
      weight={weight} >
      {formatNumber(monney)}{' '}
      <AppText
        style={tw(`${decorationLine}`)}
        weight={weight}
      >đ</AppText>
    </AppText>
  )
}