import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { phucKhang } from '../models'

export const themeModel = {
  phucKhang: phucKhang
} as const

type typeThemeModel = typeof themeModel
type keyThemeModel = keyof typeThemeModel
type valueThemeModel = typeThemeModel[keyThemeModel]

interface themeState {
  value: valueThemeModel
}

const initialState = {
    value: themeModel.phucKhang
} as themeState

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<keyThemeModel>) => {
            state.value = themeModel[action.payload]
        }
    }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer