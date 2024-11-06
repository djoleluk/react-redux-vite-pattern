import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface User {
  user_id: number
  first_name: string
  last_name: string
  birth_date: string
  gender: string
  weight: number
  height: number
  email: string
}

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: []
}

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
    const data = await response.json()
    return data
  }
)

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userId: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
      method: 'DELETE',
    });
    return userId;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.user_id !== action.payload)
      })
  },
})

export const selectUsers = (state: RootState) => state.users.users
export default usersSlice.reducer 