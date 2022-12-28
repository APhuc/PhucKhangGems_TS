import { useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { typeGetPolicy, postApi, request } from '@networking'
import { useAppSelector } from '@reduxApp/hooks'
import PolicyCard from './policy_card'
import { urlApp } from '@constants'

export default function PolicyScreen() {
  const [data, setData] = useState<typeGetPolicy[]>([])

  const theme = useAppSelector((state) => state.theme.value)

  useLayoutEffect(() => {
    callApiGetPolicy()
  }, [])

  const callApiGetPolicy = async () => {
    const { result, error } = await postApi(urlApp.postUrl.getPosts, request.getPolicy)
    if (!error) {
      const content = result as typeGetPolicy[]
      setData(content)
    }
  }

  if (data.length > 0) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.BG_APP }}
        showsVerticalScrollIndicator={false}>
        {data.map((item, index) => (
          <PolicyCard 
            data={item}
            key={`${index}`} />
        ))}
      </ScrollView>
    )
  }
  return null
}