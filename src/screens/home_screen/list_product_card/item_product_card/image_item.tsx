import { useLayoutEffect, useState } from 'react'
import { Image } from 'react-native'

import { urlApp } from '@constants'

export default function ImageItem({ url }: { url: String | undefined }) {
  const urlProduct = `${urlApp.serverUrl}${url}`

  const [imageUri, setImageUri] = useState<String | undefined>(undefined)
  const [ratio, setRatio] = useState(-1)

  useLayoutEffect(() => {
    if (url) {
      Image.getSize(
        urlProduct,
        (width, height) => {
          // console.log(width,"width", height," height")
          if (width && height) {
            if (height >= 692) {
              setImageUri(urlProduct)
              setRatio((width +150 ) / height)
            }
            else {
              setImageUri(urlProduct)
              setRatio(width / height)
            }
          }
        }, () => {
          setImageUri(urlApp.logoTextUrl)
          Image.getSize(
            urlApp.logoTextUrl,
            (width, height) => setRatio(width / height)
          )
        })
    }
  }, [])

  if (ratio != -1 && imageUri) {
    return (
      <Image
        source={{ uri: `${imageUri}` }}
        style={{ aspectRatio: ratio }}
      />
    )
  }

  return null
}