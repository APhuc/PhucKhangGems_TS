import { useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { postApi, request, typeGetContact } from '@networking'
import { useAppSelector } from '@reduxApp/hooks'
import ContactCard from './contact_card'
import { urlApp } from '@constants'

export default function ContactScreen() {
  const theme = useAppSelector((state) => state.theme.value)

  const [data, setData] = useState<typeGetContact[]>([])

  useLayoutEffect(() => {
    callApiGetContact()
  }, [])

  const callApiGetContact = async () => {
    const { result, error } = await postApi(urlApp.postUrl.getStoreInformation, request.getContact)
    if (!error) {
      const content = result as typeGetContact[]
      setData(content)
    }
  }

  if (data.length > 0) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.BG_APP }}
        showsVerticalScrollIndicator={false}>
        {data.map((item, index: number) => (
          <ContactCard
            key={`${index}`}
            data={item}
            index={index} />))}
      </ScrollView>
    )
  }
  return null
}