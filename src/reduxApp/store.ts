import { configureStore } from '@reduxjs/toolkit'

import listIdItemCartReducer from './list_id_item_cart'
import listLikeItemReducer from './list_like_item'
import themeReducer from '@themes/slice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    listIdItemCart: listIdItemCartReducer,
    listLikeItem: listLikeItemReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch