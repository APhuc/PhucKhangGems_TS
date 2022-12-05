import { configureStore } from '@reduxjs/toolkit'

import cartQuantityReducer from './cart_quantity'
import themeReducer from '@themes/slice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        cartQuantity: cartQuantityReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch