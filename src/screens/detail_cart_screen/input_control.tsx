import { KeyboardTypeOptions, StyleProp, TextInput, TextStyle, Pressable, View } from 'react-native'
import { useState } from 'react'

import { RegisterOptions, FieldError, Controller, Control } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { typeGetVoucher, postApi, request } from '@networking'
import { urlApp, strApp, scale } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'
import { FormValues } from './type'

type Props = {
  control: Control<FormValues, any>
  name: 'address' | 'userName' | 'userPhone' | 'userEmail' | 'voucher' |'note' 
  error: FieldError | undefined
  rules: RegisterOptions
  maxLength: number
  title: String
  isRequired?: boolean
  placeholder: string
  keyboardType?: KeyboardTypeOptions | undefined
  strError?: string
  onBlur?: (value: string) => void
  multiline?: boolean
  customStyle?: StyleProp<TextStyle>
  isDelete?: boolean
}

const InputControl: React.FC<Props> = ({
  control, name, error, rules, maxLength, title, isRequired = true, placeholder, keyboardType = 'default', strError, onBlur, multiline = false, customStyle, isDelete = false
}) => {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const [isIconDelete, setIsIconDelete] = useState(false)

  const _onBlur = async(value: string, onChange: (...event: any[]) => void) => {
    if (onBlur && value.length > 0) {
      if (isDelete) {
        setIsIconDelete(true)
        request.voucher.magiamgia = value
        const { result, error } = await postApi(urlApp.postUrl.getProduct, request.voucher)
        if (!error) {
          const contents = result as typeGetVoucher[]
          if (contents[0].success !== '00') {
            const content = contents[0]
            onChange(content.label)
            onBlur(`(${content.LoaiGiamGia})[${content.MaGiamGia}]:${content.SoTienGiamGia}{1}${content.MaGiamGia}{1}${content.SoTienGiamGia}`)
          } else {
            onChange(strApp.str_not_voucher)
            onBlur('')
          }
        }
      } else {
        onBlur(value)
      }
    }
  }

  const _onPress = (onChange: (...event: any[]) => void) => {
    if (onBlur) {
      setIsIconDelete(false)
      onChange('')
      onBlur('')
    }
  }

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <>
            <AppText style={[
              tw('mt-3 mb-1'),
              { color: theme.COLOR_TEXT_NAME }
              ]}>{isRequired ? `${title}(*)` : title}</AppText>

            <View style={[
              tw('w-full rounded-lg text-base flex-row items-center'),
              { backgroundColor: theme.BG_APP }
            ]}>
              <TextInput
                style={[
                  tw('flex-1 p-2 text-base'),
                  { color: isIconDelete ? theme.COLOR_TEXT_MONNEY : theme.COLOR_ICON },
                  customStyle
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.COLOR_TEXT_NAME}
                maxLength={maxLength}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                onBlur={() => _onBlur(value, onChange)}
                multiline={multiline}
                editable={!isIconDelete} />

              {isIconDelete && 
                <Pressable 
                  style={tw('px-2')}
                  onPress={() => _onPress(onChange)}>
                  <Feather
                    name='x'
                    size={scale(14)}
                    color={theme.COLOR_TEXT_MONNEY_THROUGH} />
                </Pressable>}
            </View>
          </>)}
        name={name} />

      {error && <AppText style={{ color: theme.COLOR_TEXT_ERROR }}>{error.message && error.message.length > 0  ? error.message : strError}</AppText>}
    </>
  )
}

export default InputControl