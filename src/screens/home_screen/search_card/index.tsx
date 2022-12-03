import { TextInput, View } from 'react-native'

import { useTailwind } from 'tailwind-rn'

import { useAppSelector } from '@reduxApp/hooks'

export default function SearchCard() {
  const tw = useTailwind()
  
  const theme = useAppSelector((state) => state.theme.value)

  return (
    <View style={[
      tw('h-8 rounded-full my-2.5 mx-5 flex-row'), 
      {
        backgroundColor: theme.BG_SEARCH_PRODUCT,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
      }
    ]}>
      <TextInput
        placeholder='Tìm kiếm......'
        placeholderTextColor='#4B5563'
        style={tw('flex-1 rounded-full px-2')}
      />

      
    </View>
  )
}