import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import AuthorizationApi from '../../api/AuthorizationApi';
import { DialogForm } from '../../types/enum';
import { IUser, IAuthorization } from '../../types/types';

const authorizationApi = new AuthorizationApi();

interface IAuthorizationState {
  key: string | null,
  user: IUser | null,
  isDialogShown: boolean,
  dialogForm: DialogForm | null,
}
const initialState: IAuthorizationState = {
  key: localStorage.getItem('api-key'),
  user: null,
  isDialogShown: false,
  dialogForm: null,
}



export const register = createAsyncThunk(
  'authorization/register',
  async (user: IUser) => authorizationApi.register(user),
)

export const login = createAsyncThunk(
  'authorization/login',
  async (authorization: IAuthorization) => authorizationApi.login(authorization),
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
    },
    hideDialog (state): void {
      state.isDialogShown = false;
      state.dialogForm = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isDialogShown = false;
        state.dialogForm = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isDialogShown = true;
        state.dialogForm = DialogForm.register;
        console.error(action.error.message);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.key = action.payload.key;
        localStorage.setItem('api-key', state.key);
      })
      .addCase(login.rejected, (state, action) => {
        state.isDialogShown = true;
        state.dialogForm = DialogForm.login;
        console.error(action.error.message);
      })
  },
});

export const { registrationStart, loginStart, selectDialogForm, hideDialog } = authorizationSlice.actions;

const authorizationReducer = authorizationSlice.reducer;

export default authorizationReducer;