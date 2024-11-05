import { configureStore } from '@reduxjs/toolkit'
import pendingUsersReducer from '../features/pendingUsers/pendingUsersSlice'

export const store = configureStore({
  reducer: {
    pendingUsers: pendingUsersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 