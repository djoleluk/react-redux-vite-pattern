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
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove user');
    }
    return userId;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
      .addCase(removeUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = state.users.filter(user => user.user_id !== action.payload)
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to remove user'
      })
  },
})

export const selectUsers = (state: RootState) => state.users.users
export const selectUsersStatus = (state: RootState) => state.users.status
export const selectUsersError = (state: RootState) => state.users.error
export default usersSlice.reducer 