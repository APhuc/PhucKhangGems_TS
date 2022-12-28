import { KeyboardTypeOptions, Pressable, TextInput, Keyboard, View } from 'react-native'
import { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import { useTailwind } from 'tailwind-rn'

import { fontFamilyApp, scale } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'

type Props = {
  onSearch: (text: string) => void
  placeholder: string
  keyboardType?: KeyboardTypeOptions | undefined
  maxLength?: number
  value?: string
}

const SearchCard: React.FC<Props> = ({ 
  onSearch, placeholder, keyboardType = 'default', maxLength = 500, value = ''
}) => {
  const tw = useTailwind()
  
  const theme = useAppSelector((state) => state.theme.value)

  const [textSearch, setTextSearch] = useState(value)

  useEffect(() => {
    // if (textSearch.length > 0) {
    //   setTextSearch('')
    // }
    setTextSearch(value)
  }, [placeholder])
  
  const _onSearch = () => {
    onSearch(textSearch)
    Keyboard.dismiss()
  }

  return (
    <View style={[
      tw('h-8 rounded-full flex-row items-center'), {
        backgroundColor: theme.BG_SEARCH_PRODUCT,
        shadowColor: theme.COLOR_ICON,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
      }]}>
      <TextInput
        value={textSearch}
        onChangeText={setTextSearch}
        placeholder={placeholder}
        placeholderTextColor={theme.COLOR_TEXT_PLACEHOLDER}
        style={[
          tw('flex-1 rounded-full pl-2 text-base'),
          { fontFamily: fontFamilyApp(6) }
        ]}
        onSubmitEditing={_onSearch}
        keyboardType={keyboardType}
        maxLength={maxLength} />
      
      <Pressable 
        style={tw('px-2')}
        onPress={_onSearch}>
        <Ionicons name='search' size={scale(24)} color={theme.COLOR_ICON} />
      </Pressable>
    </View>
  )
}

export default SearchCard