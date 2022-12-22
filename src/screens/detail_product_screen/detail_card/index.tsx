import { NativeSyntheticEvent, Pressable, Image, View, StyleSheet, Text } from 'react-native'
import { useLayoutEffect, useState } from 'react'

import ImageView from 'react-native-image-viewing'
import PagerView from 'react-native-pager-view'
import { useTailwind } from 'tailwind-rn'

import { typeGetDetailProduct, postApi, request } from '@networking'
import { LikeProduct, AppText } from '@components'
import { useAppSelector } from '@reduxApp/hooks'
import DescriptionItem from './description_item'
import { urlApp, width } from '@constants'

type typeImage = {
  uri: string
  width: number
  height: number
}

export default function DetailCart({ idProduct, countLike }: { idProduct: number, countLike: number }) {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)
  const listLikeItem = useAppSelector((state) => state.listLikeItem.value)

  const [product, setProduct] = useState<typeGetDetailProduct | null>(null)
  const [images, setImages] = useState<typeImage[]>([])
  const [positionPage, setPositionPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    callApiGetDetailProduct()
  }, [idProduct])

  useLayoutEffect(() => {
    if (product) {
      const listImage = [
        product.URLImage, product.URLImage2,
        product.URLImage3, product.URLImage4, product.URLImage5
      ].filter(value => value !== '')

      injectSizeIntoImages(listImage.length > 0 ? listImage : [urlApp.logoTextUrl])
    }
  }, [product])

  const injectSizeIntoImages = async (listImage: String[]) => {
    const images = [] as any
    for (const uri of listImage) {
      const image = await getImageSize(`${urlApp.serverUrl}${uri}`)
      images.push(image)
    }
    setImages(images)
  }

  const getImageSize = async (uri: string) => new Promise(resolve => {
    Image.getSize(uri, (widthImg, heightImg) => {
      if (widthImg && heightImg) {
        resolve({
          uri: uri,
          width: width,
          height: width * (widthImg >= heightImg ? widthImg / heightImg : heightImg / widthImg)
        })
      }
    }, () => {
      Image.getSize(urlApp.logoTextUrl, (widthImg, heightImg) => {
        if (widthImg && heightImg) {
          resolve({
            uri: urlApp.logoTextUrl,
            width: width,
            height: width * (widthImg >= heightImg ? widthImg / heightImg : heightImg / widthImg)
          })
        }
      })
    })
  })

  const callApiGetDetailProduct = async () => {
    request.getDetailProduct.idsanpham = idProduct
    const { result, error } = await postApi(urlApp.postUrl.getProduct, request.getDetailProduct)
    if (!error) {
      if (result[0].MaSanPham) {
        setProduct(result[0])
        return { isGetDetailProduct: true }
      }
    }
    return { isGetDataDetailProduct: false }
  }

  const _onPageSelected = (e: NativeSyntheticEvent<Readonly<{position: number}>>) => setPositionPage(e.nativeEvent.position)
  const _onPress = () => setIsVisible(true)
  const _onRequestClose = () => setIsVisible(false)

  if (product && images.length > 0) {
    const stylePosition = 'absolute bottom-3 justify-center'

    return (
      <View style={tw('flex-1')}>
        <View style={{width: width, height: images[positionPage].height}}>
          <PagerView 
            style={tw('flex-1')} 
            initialPage={0} 
            onPageSelected={_onPageSelected}>
            {images.map((image, index) => (
              <Pressable 
                key={`${index}`}
                onPress={_onPress}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: image.width,
                    height: image.height,
                    resizeMode: 'contain'
                  }} />
              </Pressable>
            ))}
          </PagerView>

          <LikeProduct 
            isLike={listLikeItem[product.MaSanPham]?.isLike}
            styleContainer={[
              tw(`${stylePosition} left-3 h-10 w-10 rounded-full items-center`),
              { backgroundColor: theme.BG_APP }
            ]}
            sizeIcon={24}
            idProduct={idProduct}
            countLike={countLike}
            productCode={product.MaSanPham} />
          
          <View style={tw(`${stylePosition} left-0 right-0 flex-row`)}>
            {images.map((image, index) => (
              <View
                key={`${index}`}
                style={[
                  tw('h-2 w-2 rounded-full mx-0.5'),
                  { backgroundColor: positionPage == index ? theme.BG_APP : theme.COLOR_PAGE_INDEX }
                ]} />
            ))}
          </View>
        </View>
        
        <DescriptionItem product={product} idProduct={idProduct}/>

        <ImageView
          images={images}
          imageIndex={positionPage}
          visible={isVisible}
          onRequestClose={_onRequestClose}
          doubleTapToZoomEnabled={false}
          presentationStyle='fullScreen'
          FooterComponent={({ imageIndex }) => (
            <AppText style={[
              tw('text-base text-center pb-5'),
              { color: theme.BG_APP }
            ]}>
              {`${imageIndex + 1} / ${images.length}`}
            </AppText>
          )} />
      </View>
    )
  }
  
  return null
}