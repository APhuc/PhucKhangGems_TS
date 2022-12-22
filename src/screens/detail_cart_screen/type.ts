import { typeGetProductCart } from '@networking'

export type typeMenu = {
  name: string
  code: string
  minimum_price_in_province?: number
  minimum_price_out_province?: number
}

export type FormValues = {
  products: typeGetProductCart[]
  country: typeMenu
  province: typeMenu
  wardDistrict: typeMenu
  address: string
  userName: string
  userPhone: string
  userEmail: string
  delivery: typeMenu
  receive: typeMenu
  transfer: typeMenu
  note: string
}