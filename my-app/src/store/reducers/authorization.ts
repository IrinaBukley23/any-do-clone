import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthorizationApi from '../../api/AuthorizationApi';
import { DialogForm } from '../../types/enum';
import { IAuthorization, IRegistration, IUser } from '../../types/types';

const authorizationApi = new AuthorizationApi();
interface IAuthorizationState {
  key: string | null,
  user: IUser | null,
  isDialogShown: boolean,
  dialogForm: DialogForm | null,
  serverError: string | null,
  loginName: string | null,
  loginEmail: string | null,
}
const initialState: IAuthorizationState = {
  key: localStorage.getItem('api-key'),
  user: null,
  isDialogShown: false,
  dialogForm: null,
  serverError: null,
  loginName: null,
  loginEmail: null,
}

export const register = createAsyncThunk(
  'authorization/register',
  async (registration: IRegistration) => authorizationApi.register(registration),
)

export const login = createAsyncThunk(
  'authorization/login',
  async (authorization: IAuthorization) => authorizationApi.login(authorization),
)

export const logout = createAsyncThunk(
  'authorization/logout',
  async (arg, thunkApi) => {
    const state = thunkApi.getState();
    const { authorization } = state as { authorization: IAuthorizationState }; 

    if (!authorization.key) {
      throw new Error('User isn\'t authorized.');
    }

    return authorizationApi.logout(authorization.key);
  },
)

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    registrationStart(state: IAuthorizationState): void {
      state.isDialogShown = true;
      state.dialogForm = DialogForm.register;
    },
    loginStart(state): void {
      state.isDialogShown = true;
      state.dialogForm = DialogForm.login;
    },
    selectDialogForm(state, action: PayloadAction<DialogForm>): void {
      state.dialogForm = action.payload;
      state.serverError = null;
    },
    hideDialog (state): void {
      state.isDialogShown = false;
      state.dialogForm = null;
      state.serverError = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isDialogShown = false;
        state.dialogForm = null;
        state.serverError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isDialogShown = true;
        state.dialogForm = DialogForm.register;
        if (action.error.message !== undefined) {
          state.serverError = action.error.message;
          console.error(action.error.message);
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.key = action.payload.key;
        state.loginName = action.payload.name;
        state.loginEmail = action.payload.email;
        localStorage.setItem('name', state.loginName);
        localStorage.setItem('email', state.loginEmail);
        localStorage.setItem('api-key', state.key);
        console.log(action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.isDialogShown = true;
        state.dialogForm = DialogForm.login;
        if (action.error.message !== undefined) {
          state.serverError = action.error.message;
          console.error(action.error.message);
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.key = null;
        state.loginName = null;
        state.loginEmail = null;
        localStorage.removeItem('api-key');
      })
      .addCase(logout.rejected, (state, action) => {
        if (action.error.message !== undefined) {
          console.error(action.error.message);
        }
      })
  },
});

export const { registrationStart, loginStart, selectDialogForm, hideDialog } = authorizationSlice.actions;

const authorizationReducer = authorizationSlice.reducer;

export default authorizationReducer;