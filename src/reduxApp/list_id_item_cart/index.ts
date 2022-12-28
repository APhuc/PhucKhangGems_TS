import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type typePayload = {
  idProduct: string
  action: 'increment' | 'decrement' | 'delete' | 'remove'
}

interface idItems {
  [P: string]: number
}

interface listIdItemCartState {
  value: idItems
}

const initialState = {
  value: {}
} as listIdItemCartState

export const listIdItemCartSlice = createSlice({
  name: 'listIdItemCart',
  initialState,
  reducers: {
    changeListIdItemCart: (state, action: PayloadAction<typePayload>) => {
      const id = action.payload.idProduct
      if (id === '-101' && action.payload.action === 'remove') {
        console.log(state.value)
        state.value = {}
      } else {
        if (state.value[id]) {
          switch (action.payload.action) {
            case 'increment':
              state.value[id] += 1
              break
            case 'decrement':
              if (state.value[id] == 1) {
                delete state.value[id]
              } else {
                state.value[id] -= 1
              }
              break
            case 'delete':
              delete state.value[id]
              break
          }
        } else {
          state.value[id] = 1
        }
      }
    }
  }
})

export const { changeListIdItemCart } = listIdItemCartSlice.actions
export default listIdItemCartSlice.reducer