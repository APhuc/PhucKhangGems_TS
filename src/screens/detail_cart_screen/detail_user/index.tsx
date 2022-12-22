import { FieldErrorsImpl, Control } from'react-hook-form'

import { requiredRules, phoneRules, emailRules } from '../rules'
import InputControl from '../input_control'
import { FormValues } from '../type'
import { strApp } from '@constants'

export default function DetailUser(
  { control, errors } : { control: Control<FormValues, any>, errors: Partial<FieldErrorsImpl<FormValues>> }
) {
  return (
    <>
      <InputControl
        control={control}
        name='userName'
        error={errors.userName}
        rules={requiredRules}
        title={strApp.str_input_name}
        placeholder={strApp.str_input_name}
        maxLength={100}
        strError={strApp.str_not_input_user_name} />

      <InputControl
        control={control}
        name='userPhone'
        error={errors.userPhone}
        rules={phoneRules}
        title={strApp.str_input_phone}
        placeholder={strApp.str_input_phone}
        maxLength={10}
        keyboardType='numeric'
        strError={strApp.str_not_input_user_phone} />

      <InputControl
        control={control}
        name='userEmail'
        error={errors.userEmail}
        rules={emailRules}
        title={strApp.str_input_email}
        placeholder={strApp.str_input_email}
        maxLength={200}
        keyboardType='email-address'
        isRequired={false} />
    </>
  )
}