import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'
import { SubmitHandler, Controller, useForm } from'react-hook-form'
import { useTailwind } from 'tailwind-rn'

import { typeGetDeliveryCharges, typeGetProductCart, typeGetPayment, postApi, request } from '@networking'
import { verticalScale, valueApp, strApp, urlApp, scale } from '@constants'
import { PressOpacity, AppText } from '@components'
import ListProductCart from './list_product_cart'
import { useAppSelector } from '@reduxApp/hooks'
import DetailDelivery from './detail_delivery'
import { FormValues, typeMenu } from './type'
import DetailAdress from './detail_address'
import { requiredRules } from './rules'
import DetailUser from './detail_user'


export default function DetailCartScreen() {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const listIdItemCart = useAppSelector((state) => state.listIdItemCart.value)

  const [errorCountry, setErrorCountry] = useState(false)
  const [errorProvince, setErrorProvince] = useState(false)
  const [errorWardDistrict, setErrorWardDistrict] = useState(false)

  const [valueProducts, setValueProducts] = useState<typeGetProductCart[]>([])
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0)

  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
    defaultValues: {
      products: [] as typeGetProductCart[],
      country: {
        name: strApp.str_choose_country,
        code: '-1'
      },
      province: {
        name: strApp.str_choose_province,
        code: '-1'
      },
      wardDistrict: {
        name: strApp.str_choose_wards_district,
        code: '-1'
      },
      address: '',
      userName: '',
      userPhone: '',
      userEmail: '',
      delivery: {
        name: '',
        code: ''
      },
      receive: {
        name: '',
        code: ''
      },
      transfer: {
        name: '',
        code: '',
        minimum_price_in_province: 0,
        minimum_price_out_province: 0
      } as typeMenu,
      note: ''
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.country.code === '-1') {
      setErrorCountry(true)
    }
    if (data.province.code === '-1') {
      setErrorProvince(true)
    }
    if (data.wardDistrict.code === '-1') {
      setErrorWardDistrict(true)
    }
    if (data.country.code !== '-1' && data.province.code !== '-1' && data.wardDistrict.code !== '-1') {
      const chooseProduct = valueProducts.map(product => {
        return {
          id: product.IDSanPham,
          soluongtrukho: product.SoLuongTrongKho,
          soluongdachon: listIdItemCart[`${product.IDSanPham}`],
          giaban: product.GiaBan,
          giasaugiam: product.GiaSauGiam,
          tonggiaban: listIdItemCart[`${product.IDSanPham}`] * product.GiaSauGiam,
          thoigianbaohanh: product.ThoiGianBaoHanh
        }
      })
      request.payment.diachi = data.address
      request.payment.dienthoai = data.userPhone
      request.payment.dienthoainhan = data.userPhone
      request.payment.email = data.userEmail
      request.payment.ghichu = data.note
      request.payment.hinhthucnhanhang = parseInt(data.receive.code)
      request.payment.hinhthucthanhtoan = parseInt(data.delivery.code)
      request.payment.mabang = data.province.code
      request.payment.maquocgia = data.country.code
      request.payment.nhantaicuahang = parseInt(data.receive.code)
      request.payment.phiship = deliveryCharges
      request.payment.sanphamdachon = chooseProduct
      request.payment.tenbang = data.province.name
      request.payment.tenkhachhang = data.userName
      request.payment.tenquan = data.wardDistrict.name.split(', ')[1]
      request.payment.tenquocgia = data.country.name
      request.payment.thanhpho = data.province.name
      const { result, error } = await postApi(urlApp.postUrl.payment, request.payment)
      if (!error) {
        const contents = result as typeGetPayment
      }
    }
  }

  const setValueCountry = (data: typeMenu) => {
    if (data.code !== '-1' && errorCountry) {
      setErrorCountry(false)
    }
    setValue('country', data)
  }

  const setValueProvince = (data: typeMenu) => { 
    if (data.code !== '-1' && errorProvince) {
      setErrorProvince(false)
    }
    setValue('province', data)
  }

  const setValueWardDistrict = (data: typeMenu) => {
    if (data.code !== '-1') {
      if (errorWardDistrict) {
        setErrorWardDistrict(false)
      }
      if (getValues('address') && getValues('receive.code') === valueApp.receive.delivery) {
        callApiDeliveryCharge(data)
      }
    }
    setValue('wardDistrict', data)
  }

  const setValueDelivery= (data: typeMenu) => setValue('delivery', data)

  const setValueReceive= (data: typeMenu) => {
    setValue('receive', data)
    if (getValues('address') && (getValues('wardDistrict.code') !== '-1') && (data.code === valueApp.receive.delivery)) {
      callApiDeliveryCharge()
    }
    if (data.code === valueApp.receive.received_at_the_shop) {
      setDeliveryCharges(0)
    }
  }

  const setValueTransfer = (data: typeMenu) => {
    setValue('transfer', data)
    if (getValues('address') && (getValues('wardDistrict.code') !== '-1') && (getValues('receive.code') === valueApp.receive.delivery)) {
      callApiDeliveryCharge(undefined, undefined, data)
    }
  }

  const callApiDeliveryCharge = async(wardDistrict?: typeMenu, address?: string, transfer?: typeMenu, listIdItemCartChange?: any) => {
    let weight = 0
    valueProducts.map(product => weight += (product.KhoiLuong * (listIdItemCartChange ? listIdItemCartChange[`${product.IDSanPham}`] : listIdItemCart[`${product.IDSanPham}`])))

    request.deliveryCharges.idcuahang = valueProducts[0].IDCuaHang
    request.deliveryCharges.matinhgui = valueProducts[0].MaBang
    request.deliveryCharges.tinhgui = valueProducts[0].TenBang
    request.deliveryCharges.quangui = valueProducts[0].TenQuan
    request.deliveryCharges.matinhnhan = getValues('province.code')
    request.deliveryCharges.tinhnhan = getValues('province.name')
    request.deliveryCharges.quannhan = wardDistrict ? wardDistrict.name.split(', ')[1] : getValues('wardDistrict.name').split(', ')[1] 
    request.deliveryCharges.diachinhan = address ? address : getValues('address')
    request.deliveryCharges.trongluong = weight
    request.deliveryCharges.manhavanchuyen = transfer ? transfer.code : getValues('transfer.code')
    request.deliveryCharges.chuyenphatnhanh = (transfer ? transfer.code : getValues('transfer.code')) === valueApp.transfer.GHTK
    request.deliveryCharges.giatoithieunoitinh = (transfer ? transfer.minimum_price_in_province : getValues('transfer.minimum_price_in_province')) ?? 0
    request.deliveryCharges.giatoithieulientinh = (transfer ? transfer.minimum_price_out_province : getValues('transfer.minimum_price_out_province')) ?? 0

    const { result, error } = await postApi(urlApp.postUrl.deliveryCharges, request.deliveryCharges)
    if (!error) {
      const contents = result as typeGetDeliveryCharges
      setDeliveryCharges(contents.cuocphi)
    }
  }

  const setlistIdItemCart= (id: string, name: string) => {
    let listIdItemCartChange = {...listIdItemCart}
    name == 'plus' ? listIdItemCartChange[id] += 1 : listIdItemCartChange[id] -= 1
    if (getValues('address') && (getValues('wardDistrict.code') !== '-1') && (getValues('receive.code') === valueApp.receive.delivery)) {
      callApiDeliveryCharge(undefined, undefined, undefined, listIdItemCartChange)
    }
  }

  const onBlur = (value: string) => {
    if (getValues('wardDistrict.code') !== '-1' && getValues('receive.code') === valueApp.receive.delivery) {
      callApiDeliveryCharge(undefined, value)
    }
  }

  let nameProducts = ''
  valueProducts.map(product => {
    if (product.GiaSauGiam == 0) {
      nameProducts += (product.TenSanPham + ', ')
    }
  })

  return (
    <KeyboardAwareScrollView 
      style={[
        { backgroundColor: theme.BG_CART },
        tw('flex-1')
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={tw('flex-1 px-3')}>
      <Controller
        control={control}
        rules={requiredRules}
        render={({ field }) => (
          <ListProductCart 
            field={field}
            setValueProducts={setValueProducts}
            deliveryCharges={deliveryCharges}
            setlistIdItemCart={setlistIdItemCart} />
        )}
        name='products' />

      <DetailAdress 
        setValueCountry={setValueCountry}
        setValueProvince={setValueProvince}
        setValueWardDistrict={setValueWardDistrict}
        control={control}
        errors={errors}
        errorCountry={errorCountry}
        errorProvince={errorProvince}
        errorWardDistrict={errorWardDistrict}
        onBlur={onBlur} />

      <DetailUser
        control={control}
        errors={errors} />

      <DetailDelivery 
        setValueDelivery={setValueDelivery}
        setValueReceive={setValueReceive}
        setValueTransfer={setValueTransfer}
        control={control}
        errors={errors}
        products={valueProducts} />

      {nameProducts.length > 0 &&
        <View style={[tw('border-2 p-2 mt-3'), { borderColor: theme.COLOR_BORDER_COUNT}]}>
          <AppText style={tw('text-base')}>
            {strApp.str_product}{' '}
            <AppText 
              style={{ color: theme.COLOR_TEXT_ERROR }}
              weight={7}>{nameProducts.slice(0, nameProducts.length - 2)}</AppText>
            {' '}{strApp.str_store_call}
          </AppText>
        </View>}
      </View>
      
      <PressOpacity
        style={{ 
          backgroundColor: theme.COLOR_ICON,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: verticalScale(10),
          marginTop: verticalScale(10),
        }}
        press={handleSubmit(onSubmit)}>
        <AppText 
          style={[tw('text-lg'), { color: theme.BG_APP }]}
          weight={7}>{strApp.str_order}</AppText>
      </PressOpacity>
    </KeyboardAwareScrollView>
  )
}