import { Pressable, TextInput, View } from 'react-native'
import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import { useTailwind } from 'tailwind-rn'

import { fontFamilyApp, scale, strApp } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'

type Props = {
  callApiGetData: (page: number, text: string) => Promise<{
    isGetData: boolean;
    lengthData: any;
  } | {
      isGetData: boolean;
      lengthData?: undefined;
  }>
}

const SearchCard: React.FC<Props> = ({
  callApiGetData
}) => {
  const tw = useTailwind()
  
  const theme = useAppSelector((state) => state.theme.value)

  const [textSearch, setTextSearch] = useState('')
  
  const _onSearch = () => callApiGetData(1, textSearch)

  return (
    <View style={[
      tw('h-8 rounded-full my-2.5 mx-5 flex-row items-center'), 
      {
        backgroundColor: theme.BG_SEARCH_PRODUCT,
        shadowColor: theme.COLOR_SHADOW,
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
        value={textSearch}
        onChangeText={setTextSearch}
        placeholder={`${strApp.str_search}......`}
        placeholderTextColor={theme.COLOR_TEXT_PLACEHOLDER}
        style={[
          tw('flex-1 rounded-full pl-2 text-base'),
          { fontFamily: fontFamilyApp(6) }
        ]}
        onSubmitEditing={_onSearch} />
      
      <Pressable 
        style={tw('px-2')}
        onPress={_onSearch} >
        <Ionicons name='search' size={scale(24)} color={theme.COLOR_ICON} />
      </Pressable>
    </View>
  )
}

export default SearchCard