import { Image, View } from 'react-native'
import { useState } from 'react'

import { useTailwind } from 'tailwind-rn'

import { urlApp, strApp, scale } from '@constants'
import { useAppSelector } from '@reduxApp/hooks'
import { typeGetContact } from '@networking'
import { AppText } from '@components'

export default function ContactCard({ data, index }: { data: typeGetContact, index: number }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const [uri, setUri] = useState(`${urlApp.serverUrl}${data.URLLogo}`)

  const _onError = () => setUri(urlApp.logoTextUrl)

  return (
    <View style={[
      tw('px-5 pt-4 mb-2 text-center'), { 
        backgroundColor: index % 2 ? theme.BG_GREY_LINE : theme.BG_ORANGE_LINE
      }]}>
      <Image
        source={{ uri }}
        style={{ 
          resizeMode: 'contain',
          width: scale(70),
          height: scale(70),
          alignSelf: 'center'
        }}
        onError={_onError} />

      <AppText
        style={tw('text-xl text-center py-2')}
        weight={8}
      >{data.TenCuaHang}</AppText>

      <TitleText
        title={strApp.str_phone}
        content={data.DienThoaiCuaHang} />

      <TitleText
        title={strApp.str_address_shop}
        content={data.DiaChiCuaHang} />

      <TitleText
        title={strApp.str_email}
        content={data.EmailCuaHang} />

      <TitleText
        title={strApp.str_website}
        content={data.DiaChiWebCuaHang} />
    </View>
  )
}

const TitleText = ({ title, content }: { title: string, content: string }) => {
  const tw = useTailwind()

  return (
    <AppText
      style={tw('text-lg')}
      weight={6}>
      {title}:
      <AppText weight={8}>{' ' + content}</AppText>
    </AppText>
  )
}