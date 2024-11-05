import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface PendingUser {
  user_id: number
  first_name: string
  last_name: string
  birth_date: string
  gender: string
  weight: number
  height: number
  email: string
}

interface PendingUsersState {
  users: PendingUser[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PendingUsersState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchPendingUsers = createAsyncThunk(
  'pendingUsers/fetchPendingUsers',
  async () => {
    const response = await fetch('http://localhost:3001/api/pendingrequests')
    const data = await response.json()
    return data
  }
)

export const pendingUsersSlice = createSlice({
  name: 'pendingUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchPendingUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export const selectPendingUsers = (state: RootState) => state.pendingUsers.users
export const selectPendingUsersStatus = (state: RootState) => state.pendingUsers.status
export const selectPendingUsersError = (state: RootState) => state.pendingUsers.error

export default pendingUsersSlice.reducer 