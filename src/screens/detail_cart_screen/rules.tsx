import { RegisterOptions } from 'react-hook-form'

import { strApp } from '@constants'
import { regEx } from '@handles'

export const phoneRules: RegisterOptions = {
  required: true,
  pattern: {
    value: regEx.PHONE_REGEX,
    message: strApp.str_phone_error
  }
}

export const emailRules: RegisterOptions = {
  required: false,
  pattern: {
    value: regEx.EMAIL_REGEX,
    message: strApp.str_email_error
  }
}

export const requiredRules: RegisterOptions = {
  required: true
}

export const notRequiredRules: RegisterOptions = {
  required: false
}