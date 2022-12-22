import { Feather, Entypo } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { changeListIdItemCart } from '@reduxApp/list_id_item_cart'
import { useAppSelector, useAppDispatch } from '@reduxApp/hooks'
import { PressOpacity } from '@components'
import { scale } from '@constants'

export default function ButtonIcon({ id, name, isDisable, setlistIdItemCart }: { id: string, name: any, isDisable: boolean, setlistIdItemCart: (id: string, name: string) => void }) {
  const tw = useTailwind()

  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme.value)

  const sizeIcon = scale(24)

  const _press = () => {
    dispatch(changeListIdItemCart({
      idProduct: id,
      action: name === 'plus' ? 'increment' : 'decrement'
    }))
    setlistIdItemCart(id , name)
  }

  return (
    <PressOpacity
      style={tw('px-1 rounded-full')}
      isDisable={isDisable}
      press={_press} >
      {isDisable ?
        <Feather
          name='x'
          size={sizeIcon}
          color={theme.COLOR_ICON_COUNT} />:
        <Entypo 
          name={name} 
          size={sizeIcon}
          color={theme.COLOR_ICON_COUNT} />
      }
    </PressOpacity>
  )
}