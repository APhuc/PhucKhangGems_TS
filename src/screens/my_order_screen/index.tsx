import { KeyboardTypeOptions, FlatList, Pressable, View } from 'react-native'
import { useState } from 'react'

import { useTailwind } from 'tailwind-rn'

import { KeyboardDismiss, PressOpacity, SearchCard, MonneyText, AppText } from '@components'
import { verticalScale, valueApp, strApp, urlApp, scale } from '@constants'
import { typeGetCodeOrder, postApi, request } from '@networking'
import { useAppSelector } from '@reduxApp/hooks'
import { regEx } from '@handles'

type typeDataCheck = {
  id: string
  label: string
  placeHolder: string
  keyboardType: KeyboardTypeOptions | undefined
  maxLength: number
}

const DATA = [
  {
    id: '0',
    label: strApp.str_phone_number,
    placeHolder: strApp.str_input_phone,
    keyboardType: 'numeric' as KeyboardTypeOptions,
    maxLength: 10
  },
  {
    id: '1',
    label: strApp.str_code_order,
    placeHolder: strApp.str_input_code_order,
    keyboardType: 'default' as KeyboardTypeOptions,
    maxLength: 500
  }
]

const TitleText = ({ title, content }: { title: string, content: string }) => {
  const tw = useTailwind()

  const styleText = tw('text-base')

  return (
    <AppText
      style={styleText}
      weight={7}>
      {title}{': '}
      <AppText style={styleText}>{content}</AppText>
    </AppText>
  )
}

const HorizontalText = ({ title, content, isMonney = false }: { title: string, content: string, isMonney?: boolean }) => {
  const theme = useAppSelector((state) => state.theme.value)
  const tw = useTailwind()

  const sizeText = tw('text-base')

  return (
    <View style={tw('flex-row items-center justify-between')}>
      <AppText
        style={sizeText}
        weight={7}>{title}</AppText>
      
      {isMonney ?
        <MonneyText
          styleText={[
            sizeText, { 
              color: theme.COLOR_TEXT_MONNEY
            }]}
          decorationLine='underline'
          monney={parseInt(content)}
          weight={4} /> :
        <AppText style={[
          sizeText, {
            color: theme.COLOR_TEXT_MONNEY
          }]}>{content}</AppText>}
    </View>
  )
}

const Item = ({ item }: { item: typeGetCodeOrder }) =>  {
  const theme = useAppSelector((state) => state.theme.value)
  const tw = useTailwind()

  return (
    <Pressable style={[
      tw('rounded-lg mb-5 p-3'), {
        backgroundColor: theme.BG_APP
      }]}>
      <View style={tw('flex-row items-center justify-between')}>
        <AppText
          style={tw('text-base')}
          weight={7}>
          {strApp.str_code_order}{': '}
          <AppText style={[
            tw('text-base underline'), {
              color: theme.COLOR_TEXT_MONNEY
            }]}>{item.MaDonHang}</AppText>
        </AppText>
        
        {item.DuocPhepHuy == 1 && 
          <PressOpacity
            style={{
              padding: scale(5),
              borderRadius: scale(5),
              backgroundColor: theme.BG_CART
            }} press={() => {}}>
            <AppText style={tw('text-base')}>{strApp.str_cancel}</AppText>
          </PressOpacity>}
      </View>
      
      <TitleText
        title={strApp.str_name_customer}
        content={item.HoTenNguoiNhan1} />

      <TitleText
        title={strApp.str_phone_customer}
        content={item.DienThoaiKhachHang} />

      <TitleText
        title={strApp.str_date_order}
        content={item.NgayDatHang.split('T')[0]} />
      
      <TitleText
        title={strApp.str_address_shop}
        content={item.HoTenNguoiNhan.split('<br />')[1]} />
      
      <View style={[tw('w-full h-1 my-3'), { backgroundColor: theme.BG_CART }]} />

      <HorizontalText
        title={strApp.str_gross_product}
        content={`${item.TongSoLuong} ${strApp.str_product.toLowerCase()}`} />
      
      <HorizontalText
        title={strApp.str_gross_monney}
        content={`${item.TongSoTienThanhToan}`}
        isMonney={true} />

      <HorizontalText
        title={strApp.str_receive}
        content={`${item.HinhThucNhanHang}` === valueApp.receive.delivery ? strApp.str_delivery : strApp.str_received_at_the_shop} />
      
      <HorizontalText
        title={strApp.str_status_order}
        content={item.TinhTrangDonHang} />
    </Pressable>
  )
}

export default function MyOrderScreen() {
  const theme = useAppSelector((state) => state.theme.value)
  const tw = useTailwind()

  const [checkData, setCheckData] = useState<typeDataCheck>(DATA[0])
  const [dataOrderByCode, setDataOrderByCode] = useState<typeGetCodeOrder[]>([])
  const [dataOrderByPhone, setDataOrderByPhone] = useState<typeGetCodeOrder[]>([])
  const [textErrorByCode, setTextErrorByCode] = useState('')
  const [textErrorByPhone, setTextErrorByPhone] = useState('')
  const [textByCode, setTextByCode] = useState('')
  const [textByPhone, setTextByPhone] = useState('')

  const _pressCheck = (data: typeDataCheck) => {
    setCheckData(data)
  }

  const _onSearch =  async (text: string) => {
    if (text.length > 0) {
      checkData.id === DATA[0].id ? setTextByPhone(text) : setTextByCode(text)
      if (checkData.id === DATA[0].id && !regEx.PHONE_REGEX.test(text)) {
        setTextErrorByPhone(strApp.str_phone_error)
      } else {
        if (checkData.id === DATA[0].id) {
          request.getOrderByPhone.dienthoaikhachhang = text
          const { result, error } = await postApi(urlApp.postUrl.getOrder, request.getOrderByPhone)
          if (!error) {
            setDataOrderByPhone(result.DonHang)
            setTextErrorByPhone(result.DonHang.length > 0 ? '' : strApp.str_error_phone_order)
          }
        } else {
          request.getOrderByCode.madonhang = text
          const { result, error } = await postApi(urlApp.postUrl.getOrder, request.getOrderByCode)
          if (!error) {
            setDataOrderByCode(result.DonHang)
            setTextErrorByCode(result.DonHang.length > 0 ? '' : strApp.str_error_code_order)
          }
        }
      }
    } else {
      if (checkData.id === DATA[0].id) {
        setTextErrorByPhone('')
        setTextByPhone('')
      } else {
        setTextErrorByCode('')
        setTextByCode('')
      }
    }
  }

  const styleTitle = tw('text-base')

  const renderItem = ({ item }: { item: typeGetCodeOrder }) => (
    <Item item={item} />
  )

  return (
    <KeyboardDismiss>
      <View style={[
        tw('p-3'), {
          backgroundColor: theme.BG_CART,
          flex: 1
      }]}>
        <AppText style={styleTitle}>
          {strApp.str_information_order}
        </AppText>

        <AppText style={styleTitle}>
          {strApp.str_please_input_order}
        </AppText>

        <View style={tw('flex-row mt-3 items-center')}>
          {DATA.map(data => (
            <PressOpacity 
              key={data.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: scale(20)
              }} press={() => _pressCheck(data)}
              isDisable={checkData.id === data.id}>
              <View style={{
                width: scale(14),
                height: scale(14),
                borderRadius: scale(7),
                borderWidth: scale(1),
                marginRight: scale(5),
                backgroundColor: theme.BG_APP,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {checkData.id === data.id && 
                  <View style={{
                    width: scale(8),
                    height: scale(8),
                    borderRadius: scale(4),
                    backgroundColor: theme.COLOR_BUTTON_OK
                  }} />
                }
              </View>

              <AppText style={styleTitle}>
                {data.label}
              </AppText>
            </PressOpacity> ))}
        </View>

        <View style={tw('my-2.5')}>
          <SearchCard 
            onSearch={_onSearch}
            placeholder={checkData.placeHolder}
            maxLength={checkData.maxLength}
            keyboardType={checkData.keyboardType}
            value={checkData.id === DATA[1].id ? textByCode : textByPhone} />

          {((checkData.id === DATA[1].id && textErrorByCode) || (checkData.id === DATA[0].id && textErrorByPhone)) &&
            <AppText style={{ 
              color: theme.COLOR_TEXT_ERROR,
              marginTop: verticalScale(5)
            }}>{checkData.id === DATA[1].id ? textErrorByCode : textErrorByPhone}</AppText>}
        </View>

        {(dataOrderByPhone.length > 0 || dataOrderByCode.length > 0) && (
          <FlatList
            data={checkData.id === DATA[0].id ? dataOrderByPhone : dataOrderByCode}
            renderItem={renderItem}
            keyExtractor={item => `${item.IDDonHang}`}
            showsVerticalScrollIndicator={false} />)}
      </View>
    </KeyboardDismiss>
  )
}