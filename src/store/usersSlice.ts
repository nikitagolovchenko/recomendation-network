import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchUsers } from './../services/usersApi';

interface UsersSlice {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersSlice = {
  users: [],
  loading: false,
  error: ''
};


export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = '';
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
  },
});

export const { } = usersSlice.actions;


export const selectUsers = (state: RootState) => state.users;


export default usersSlice.reducer;
