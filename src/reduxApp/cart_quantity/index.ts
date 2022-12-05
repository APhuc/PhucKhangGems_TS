import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface cartQuantityState {
  value: any
}

const initialState = {
  value: {}
} as cartQuantityState

export const cartQuantitySlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeCartQuantity: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  }
})

export const { changeCartQuantity } = cartQuantitySlice.actions
export default cartQuantitySlice.reducer