import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authSignIn, authSignOut, authSignUp } from '../services/authorization';
import { RootState, AppThunk } from './store';

interface AuthState {
  user: User;
  loading: boolean;
  error: string;
  authorized: boolean;
}

const initialState: AuthState = {
  user: {
    displayName: '',
    uid: '',
    email: ''
  },
  authorized: false,
  loading: false,
  error: ''
};

export const signUp = createAsyncThunk(
  'auth/signup',
  async ({email, password, firstName, lastName}: UserInputs) => {
    const response = await authSignUp({email, password, firstName, lastName});
    return response;
  }
)

export const signIn = createAsyncThunk(
  'auth/signin',
  async ({email, password}: UserLogin) => {
    const response = await authSignIn({email, password});
    return response;
  }
)

export const signOut = createAsyncThunk(
  'auth/signout',
  async () => {
    authSignOut();
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email
      };
      state.authorized = true;
    },
    removeError: (state) => {
      state.error = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid as string,
          displayName: action.payload.displayName as string,
          email: action.payload.email as string
        };
        state.authorized = true;
        state.error = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid as string,
          displayName: action.payload.displayName as string,
          email: action.payload.email as string
        };
        state.authorized = true;
        state.error = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = {
          uid: '',
          displayName: '',
          email: ''
        };
        state.authorized = false;
        state.error = '';
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
  },
});

export const { setUser, removeError } = authSlice.actions;


export const selectAuth = (state: RootState) => state.auth;


export default authSlice.reducer;
