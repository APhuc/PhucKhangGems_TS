import { ScrollView, View, Text, useWindowDimensions } from 'react-native'

import { useTailwind } from 'tailwind-rn'

import { typeGetProduct } from '@networking'
import ItemProductCard from './item_product_card'
import { guidelineBaseWidth, width } from '@constants'

export default function ListProductCard({ data } : { data: [typeGetProduct] | null }) {
  const tw = useTailwind()

  const numColumns = Math.ceil(width / guidelineBaseWidth)

  if(data) {
    return (
      <ScrollView 
        contentContainerStyle={tw('w-full px-5')}
        showsVerticalScrollIndicator={false} >
        <View style={tw('flex-row')}>
          {Array.from(Array(numColumns)).map((_, colIndex) => (
            <View style={tw('flex-1')} key={`column_${colIndex}`}>
              {data
                .filter((_, index) => index % numColumns === colIndex)
                .map(product => (
                  <ItemProductCard 
                    product={product}
                    key={`${product.IDSanPham}`} />
                ))}
            </View>
          ))}
        </View>
    </ScrollView>
    )
  }

  return null
}