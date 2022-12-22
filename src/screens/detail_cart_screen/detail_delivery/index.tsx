import { useLayoutEffect, useEffect, useState } from 'react'

import { FieldErrorsImpl, Control } from'react-hook-form'
import { useTailwind } from 'tailwind-rn'

import { typeGetProductCart, typeGetDelivery, typeGetReceive, typeGetTransfer, postApi, request } from '@networking'
import { verticalScale, valueApp, strApp, urlApp, scale } from '@constants'
import { FormValues, typeMenu } from '../type'
import { notRequiredRules } from '../rules'
import InputControl from '../input_control'
import MenuChoose from '../menu_choose'

export default function DetailDelivery(
  { setValueDelivery, setValueReceive, setValueTransfer, control, errors, products } :
  { 
    setValueDelivery: (data: typeMenu) => void, setValueReceive: (data: typeMenu) => void, setValueTransfer: (data: typeMenu) => void,
    control: Control<FormValues, any>, errors: Partial<FieldErrorsImpl<FormValues>>,
    products: typeGetProductCart[]
  }
) {
  const tw = useTailwind()

  const [deliverys, setDeliverys] = useState<typeMenu[]>([])
  const [delivery, setDelivery] = useState<typeMenu>({
    name: '',
    code: ''
  })
  const [receives, setReceives] = useState<typeMenu[]>([])
  const [receive, setReceive] = useState<typeMenu>({
    name: '',
    code: ''
  })
  const [transfers, setTransfers] = useState<typeMenu[]>([])
  const [transfer, setTransfer] = useState<typeMenu>({
    name: '',
    code: '',
    minimum_price_in_province: 0,
    minimum_price_out_province: 0
  })

  useLayoutEffect(() => {
    callApiGetDelivery()
    callApiGetReceive()
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      callApiGetTransfer()
    }
  }, [products])

  const callApiGetTransfer = async() => {
    let codeProvince = ''
    products.map((product, index) => {
      if (index < products.length - 1) {
        codeProvince += (product.MaBang + ',')
      } else {
        codeProvince += product.MaBang
      }
    })
    request.getTransfer.mabanghotro = codeProvince
    const { result, error } = await postApi(urlApp.postUrl.getStoreInformation, request.getTransfer)
    if (!error) {
      let menus = [] as typeMenu[]
      const contents = result as typeGetTransfer[]
      contents.map(content => {
        menus.push({
          name: content.label,
          code: content.MaNhaVanChuyen,
          minimum_price_in_province: content.GiaToiThieuNoiTinh,
          minimum_price_out_province: content.GiaToiThieuLienTinh
        })
      })
      setTransfers(menus)
      setTransfer({
        name: contents[0].label,
        code: contents[0].MaNhaVanChuyen,
        minimum_price_in_province: contents[0].GiaToiThieuNoiTinh,
        minimum_price_out_province: contents[0].GiaToiThieuLienTinh
      })
      setValueTransfer({
        name: contents[0].label,
        code: contents[0].MaNhaVanChuyen,
        minimum_price_in_province: contents[0].GiaToiThieuNoiTinh,
        minimum_price_out_province: contents[0].GiaToiThieuLienTinh
      })
    }
  }

  const callApiGetDelivery = async() => {
    const { result, error } = await postApi(urlApp.postUrl.getStoreInformation, request.getDelivery)
    if (!error) {
      let menus = [] as typeMenu[]
      const contents = result as typeGetDelivery[]
      contents.map(content => {
        menus.push({
          name: content.TenHinhThucThanhToan,
          code: `${content.value}`
        })
      })
      setDeliverys(menus)
      setDelivery({
        name: contents[0].TenHinhThucThanhToan,
        code: `${contents[0].value}`
      })
      setValueDelivery({
        name: contents[0].TenHinhThucThanhToan,
        code: `${contents[0].value}`
      })
    }
  }

  const callApiGetReceive = async() => {
    const { result, error } = await postApi(urlApp.postUrl.getStoreInformation, request.getReceive)
    if (!error) {
      let menus = [] as typeMenu[]
      const contents = result as typeGetReceive[]
      contents.map(content => {
        menus.push({
          name: content.TenHinhThucNhanHang,
          code: `${content.value}`
        })
      })
      setReceives(menus)
      setReceive({
        name: contents[0].TenHinhThucNhanHang,
        code: `${contents[0].value}`
      })
      setValueReceive({
        name: contents[0].TenHinhThucNhanHang,
        code: `${contents[0].value}`
      })
    }
  }
  
  if (deliverys.length > 0 && receives.length > 0) {
    return (
      <>
        <MenuChoose
          title={strApp.str_choose_delivery}
          menus={deliverys}
          menu={delivery}
          setMenu={setDelivery}
          setValueMenu={setValueDelivery}
          style={{ width: scale(330) }}
          isRequired={false} />
        
        <MenuChoose
          title={strApp.str_choose_receive}
          menus={receives}
          menu={receive}
          setMenu={setReceive}
          setValueMenu={setValueReceive}
          style={{ width: scale(330) }}
          isRequired={false} />
        
        {receive.code === valueApp.receive.delivery &&
          <MenuChoose
            title={strApp.str_choose_transfer}
            menus={transfers}
            menu={transfer}
            setMenu={setTransfer}
            setValueMenu={setValueTransfer}
            style={{ width: scale(330) }}
            isRequired={false} />}

        <InputControl
          control={control}
          name='note'
          error={errors.note}
          rules={notRequiredRules}
          title={strApp.str_input_note}
          placeholder={strApp.str_input_note}
          maxLength={500}
          isRequired={false}
          multiline={true}
          customStyle={{ textAlignVertical: 'top', height: verticalScale(70) }} />
      </>
    )
  }
  return null
}