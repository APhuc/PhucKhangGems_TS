import { ScrollView, ViewStyle, Pressable } from 'react-native'
import { useState } from 'react'

import { Menu, MenuItem } from 'react-native-material-menu'
import { MaterialIcons } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn'

import { useAppSelector } from '@reduxApp/hooks'
import { AppText } from '@components'
import { verticalScale, scale } from '@constants'
import { typeMenu } from './type'

type Props = {
  title: String
  menus: typeMenu[]
  menu: typeMenu
  setMenu: React.Dispatch<React.SetStateAction<typeMenu>>
  setValueMenu: (data: typeMenu) => void
  style?: ViewStyle | undefined
  isRequired?: boolean
}

const MenuChoose: React.FC<Props> = ({ title, menus, menu, setMenu, setValueMenu, isRequired = true, style = { width: scale(330), height: verticalScale(200) } }) => {
  const tw = useTailwind()

  const theme = useAppSelector((state) => state.theme.value)

  const [visible, setVisible] = useState(false)

  const hideMenu = (item?: typeMenu) => {
    if (item) {
      setMenu(item)
      setValueMenu(item)
    }
    setVisible(false)
  }

  const showMenu = () => {
    if (menus.length > 0) {
      setVisible(true)
    }
  }

  return (
    <>
      <AppText style={[
        tw('text-base mt-3 mb-1'),
        { color: theme.COLOR_TEXT_NAME }
      ]}>{isRequired ? `${title}(*)` : title}</AppText>

      <Menu
        visible={visible}
        anchor={
          <Pressable
            style={[
              tw('w-full py-1 px-2 flex-row items-center justify-between rounded-lg'),
              { backgroundColor: theme.BG_APP }
            ]}
            onPress={showMenu}>
            <AppText 
              style={tw('text-base mr-1')}
              numberOfLines={1}>{menu.name}</AppText>

            <MaterialIcons name='arrow-drop-down' size={scale(24)} color={theme.COLOR_TEXT_MONNEY_THROUGH} />
          </Pressable>}
        onRequestClose={hideMenu}
        style={style}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {menus.map((menu, index) => (
              <MenuItem
                style={{ maxWidth: '100%' }}
                onPress={() => hideMenu(menu)}
                key={`${menu.code}${index}`}>{menu.name}</MenuItem>
            ))}
          </ScrollView>
      </Menu>
    </>
  )
}

export default MenuChoose