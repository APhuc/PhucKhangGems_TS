import { Image, View } from 'react-native'
import { useState } from 'react'

import RenderHTML from 'react-native-render-html'
import { useTailwind } from 'tailwind-rn'

import { urlApp, scale, width } from '@constants'
import { typeGetPolicy } from '@networking'
import { AppText } from 'components'

export default function PolicyCard({ data }: { data: typeGetPolicy }) {
  const tw = useTailwind()

  const [uri, setUri] = useState(`${urlApp.serverUrl}${data.URLHinhDaiDien}`)

  const _onError = () => setUri(urlApp.logoTextUrl)

  return (
    <View style={tw('mx-5 mt-4')}>
      <Image
        source={{ uri: uri }}
        style={{ flex: 1, resizeMode: 'stretch' }}
        onError={_onError} />

      <AppText
          style={tw('text-xl text-center')}
          weight={8}
      >{data.TieuDe}</AppText>

      <RenderHTML
        contentWidth={width - scale(12)}
        source={{ html: data.NoiDung }} />
    </View>
  )
}