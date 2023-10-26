import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import racesSliceReducer from './slices/racesSlice'
import authSliceReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    //cart: cartSliceReducer,
    auth: authSliceReducer,
    races: racesSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store
