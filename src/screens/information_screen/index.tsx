import { Pressable, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { RootTabScreenProps } from '@navigation'
import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'
import { strApp, scale } from '@constants'

const DATA = [
  {
    id: '0',
    screen: 'Contact',
    label: strApp.str_contact,
    icon: 'contact-support'
  },
  {
    id: '1',
    screen: 'Policy',
    label: strApp.str_policy,
    icon: 'policy'
  }
]

export default function InformationScreen({ navigation }: RootTabScreenProps<'Information'>) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const _press = (screen: any) => navigation.navigate(screen)

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: scale(10),
      backgroundColor: theme.BG_APP
    }}>
      {DATA.map(data => (
        <Pressable 
          key={data.id}
          onPress={() => _press(data.screen)}
          style={[
            tw('mt-10 flex-row items-center border-b-2 pb-2'),
            { borderColor: theme.COLOR_BORDER_COUNT }
          ]}>
          <MaterialIcons 
            name={data.icon as any}
            size={scale(24)}
            color={theme.COLOR_ICON} />
          
          <AppText 
            style={tw('ml-4 text-lg')}
            weight={7}>{data.label}</AppText>
        </Pressable>
      ))}
    </View>
  )
}