import { View } from 'react-native'

import { useTailwind } from 'tailwind-rn'

import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'

export default function TextHorizontal({ title, children }: { title: String, children: React.ReactNode }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  return (
    <View style={[
      tw('flex-row justify-between items-center border-b-2 py-2'),
      { borderColor: theme.COLOR_BORDER_COUNT }
    ]}>
      <AppText style={[
        tw('text-base'),
        { color: theme.COLOR_TEXT_NAME }
      ]}>
        {title}:
      </AppText>

      { children }
    </View>
  )
}