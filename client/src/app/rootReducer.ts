import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
// Import other reducers as needed..

const rootReducer = combineReducers({
  users: usersReducer
  // Add other reducers here..
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer 