import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urlApp } from '@constants'

type payload = {
  idProduct: string
  countLike: number
  isRefresh: boolean
}

export type typeLike = {
  countLike: number
  isLike: boolean
}

interface likes {
  [P: string]: typeLike
}

interface listLikeItemState {
  value: likes
}

const initialState = {
  value: {}
} as listLikeItemState

export const listLikeItemSlice = createSlice({
  name: 'listLikeItem',
  initialState,
  reducers: {
    changeListLikeItem: (state, action: PayloadAction<payload>) => {
      if (state.value[action.payload.idProduct]) {
        if (action.payload.isRefresh) {
          state.value[action.payload.idProduct] = {
            countLike: action.payload.countLike,
            isLike: state.value[action.payload.idProduct].isLike
          }
        } else {
          state.value[action.payload.idProduct] = {
            countLike: state.value[action.payload.idProduct].isLike ? state.value[action.payload.idProduct].countLike - 1 : state.value[action.payload.idProduct].countLike + 1,
            isLike: !state.value[action.payload.idProduct].isLike
          }
        }
      } else {
        state.value[action.payload.idProduct] = {
          countLike: action.payload.countLike + 1,
          isLike: true
        }
      }
    }
  }
})

export const { changeListLikeItem } = listLikeItemSlice.actions
export default listLikeItemSlice.reducer