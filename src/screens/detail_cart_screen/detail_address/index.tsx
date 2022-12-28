import { useLayoutEffect, useEffect, useState } from 'react'

import { FieldErrorsImpl, Control } from'react-hook-form'

import { typeGetWardDistrict, typeGetProvince, typeGetCountry, postApi, request } from '@networking'
import { useAppSelector } from '@reduxApp/hooks'
import { FormValues, typeMenu } from '../type'
import { strApp, urlApp } from '@constants'
import InputControl from '../input_control'
import { requiredRules } from '../rules'
import MenuChoose from '../menu_choose'
import { AppText } from '@components'

export default function DetailAdress(
  { setValueCountry, setValueProvince, setValueWardDistrict, control, errors, errorCountry, errorProvince, errorWardDistrict, onBlur } :
  { 
    setValueCountry: (data: typeMenu) => void 
    setValueProvince: (data: typeMenu) => void
    setValueWardDistrict: (data: typeMenu) => void
    control: Control<FormValues, any>
    errors: Partial<FieldErrorsImpl<FormValues>>
    errorCountry: boolean
    errorProvince: boolean
    errorWardDistrict: boolean
    onBlur: (value: string) => void
  }
) {
  const defaultCountry = {
    name: strApp.str_choose_country,
    code: '-1'
  }
  const defaultProvince = {
    name: strApp.str_choose_province,
    code: '-1'
  }
  const defaultWardDistrict = {
    name: strApp.str_choose_wards_district,
    code: '-1',
    city: ''
  }

  const theme = useAppSelector((state) => state.theme.value)

  const [countrys, setCountrys] = useState<typeMenu[]>([])
  const [country, setCountry] = useState<typeMenu>(defaultCountry)
  const [provinces, setProvinces] = useState<typeMenu[]>([])
  const [province, setProvince] = useState<typeMenu>(defaultProvince)
  const [wardsDistricts, setWardsDistricts] = useState<typeMenu[]>([])
  const [wardDistrict, setWardDistrict] = useState<typeMenu>(defaultWardDistrict)

  useLayoutEffect(() => {
    callApiGetCountry()
  }, [])

  useEffect(() => {
    if (country.code !== '-1') {
      setProvince(defaultProvince)
      setValueProvince(defaultProvince)
      setProvinces([])
      callApiGetProvince()
    }
  }, [country])

  useEffect(() => {
    if (province.code !== '-1') {
      callApiGetWardDistrict()
    }
    setWardDistrict(defaultWardDistrict)
    setValueWardDistrict(defaultWardDistrict)
    setWardsDistricts([])
  }, [province])

  const callApiGetWardDistrict = async() => {
    request.getWardDistrict.CountryCode = country.code
    request.getWardDistrict.StateCode = province.code
    const { result, error } = await postApi(urlApp.postUrl.getOfficialAddressInformation, request.getWardDistrict)
    if (!error) {
      if (!(result.message.length > 0)) {
        let menus = [] as typeMenu[]
        const contents = result.content as typeGetWardDistrict[]
        contents.map(content => {
          menus.push({
            name: `${content.CityName2}, ${content.CityName}`,
            code: content.CityName,
            city: content.SubdivisionName2
          })
        })
        setWardsDistricts(menus)
      }
    }
  }

  const callApiGetProvince = async() => {
    request.getProvince.CountryCode = country.code
    const { result, error } = await postApi(urlApp.postUrl.getOfficialAddressInformation, request.getProvince)
    if (!error) {
      if (!(result.message.length > 0)) {
        let menus = [] as typeMenu[]
        const contents = result.content as typeGetProvince[]
        contents.map(content => {
          menus.push({
            name: content.StateName,
            code: content.StateCode
          })
        })
        setProvinces(menus)
      }
    }
  }

  const callApiGetCountry = async() => {
    const { result, error } = await postApi(urlApp.postUrl.getOfficialAddressInformation, request.getCart)
    if (!error) {
      if (!(result.message.length > 0)) {
        let menus = [] as typeMenu[]
        const contents = result.content as typeGetCountry[]
        contents.map(content => {
          menus.push({
            name: content.CountryName,
            code: content.CountryCode
          })
        })
        setCountrys(menus)
      }
    }
  }

  if (countrys.length > 0) {
    return (
      <>
        <MenuChoose
          title={strApp.str_country}
          menus={countrys}
          menu={country}
          setMenu={setCountry}
          setValueMenu={setValueCountry} />

        {errorCountry && <AppText style={{ color: theme.COLOR_TEXT_ERROR }}>{strApp.str_not_choose_country}</AppText>}
        
        <MenuChoose 
          title={strApp.str_province}
          menus={provinces}
          menu={province}
          setMenu={setProvince}
          setValueMenu={setValueProvince} />

        {errorProvince && <AppText style={{ color: theme.COLOR_TEXT_ERROR }}>{strApp.str_not_choose_province}</AppText>}

        <MenuChoose 
          title={strApp.str_wards_district}
          menus={wardsDistricts}
          menu={wardDistrict}
          setMenu={setWardDistrict}
          setValueMenu={setValueWardDistrict} />
        
        {errorWardDistrict && <AppText style={{ color: theme.COLOR_TEXT_ERROR }}>{strApp.str_not_choose_wards_district}</AppText>}

        <InputControl
          control={control}
          name='address'
          error={errors.address}
          rules={requiredRules}
          title={strApp.str_input_delivery_address}
          placeholder={strApp.str_input_address}
          maxLength={200}
          strError={strApp.str_not_input_address}
          onBlur={onBlur} />
      </>
    )
  }
  return null
}