import { KeyboardTypeOptions, StyleProp, TextInput, TextStyle } from 'react-native'

import { RegisterOptions, FieldError, Controller, Control } from 'react-hook-form'
import { useTailwind } from 'tailwind-rn'

import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'
import { FormValues } from './type'

type Props = {
  control: Control<FormValues, any>
  name: 'address' | 'userName' | 'userPhone' | 'userEmail' | 'note'
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
}

const InputControl: React.FC<Props> = ({
  control, name, error, rules, maxLength, title, isRequired = true, placeholder, keyboardType = 'default', strError, onBlur, multiline = false, customStyle
}) => {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const _onBlur = (value: string) => {
    if (onBlur && value.length > 0) {
      onBlur(value)
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
              tw('text-base mt-3 mb-1'),
              { color: theme.COLOR_TEXT_NAME }
              ]}>{isRequired ? `${title}(*)` : title}</AppText>
    
            <TextInput
              style={[
                tw('w-full p-2 rounded-lg text-base'),
                customStyle,
                { backgroundColor: theme.BG_APP }
              ]}
              placeholder={placeholder}
              placeholderTextColor={theme.COLOR_TEXT_NAME}
              maxLength={maxLength}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
              onBlur={() => _onBlur(value)}
              multiline={multiline} />
          </>)}
        name={name} />

      {error && <AppText style={{ color: theme.COLOR_TEXT_ERROR }}>{error.message && error.message.length > 0  ? error.message : strError}</AppText>}
    </>
  )
}

export default InputControl