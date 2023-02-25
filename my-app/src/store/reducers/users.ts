import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import Client from '../../api/Client';
import UserApi from '../../api/UserApi';
import { IUser } from '../../types/types';

const userApi = new UserApi(new Client());

export const loadUsers = createAsyncThunk(
  'users/getUsers',
  async () => await userApi.getAll()
);

export const userAdapter = createEntityAdapter<IUser>({
  selectId: user => user.id,
});

export const userSelectors = userAdapter.getSelectors();

export const usersSlice = createSlice({
  name: 'cards',
  initialState: userAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        userAdapter.removeAll(state);
        userAdapter.addMany(state, action.payload);
      })
      .addCase(loadUsers.rejected, (state, action) => {
        console.error(action.error);
      })
  }
})

const usersReducer = usersSlice.reducer;

export default usersReducer;