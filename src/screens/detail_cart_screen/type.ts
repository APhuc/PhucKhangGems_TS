import { typeGetProductCart } from '@networking'

export type typeMenu = {
  name: string
  code: string
  minimum_price_in_province?: number
  minimum_price_out_province?: number
  city?: string
}

type typeVoucher = {
  code: string
  value: string
  monney: number
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
  voucher: string
  dataVoucher: typeVoucher
  note: string
}