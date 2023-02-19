import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import Client from '../../api/Client';
import ColumnApi, { IColumn, IColumnCreation, IColumnUpdate } from '../../api/ColumnApi';

const columnApi = new ColumnApi(new Client());

export const loadColumns = createAsyncThunk(
  'columns/getColumns',
  async () => await columnApi.getAll()
);

export const loadColumn = createAsyncThunk(
  'columns/getColumn',
  async (id: number) => await columnApi.getOne(id)
);

export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async (columnCreation: IColumnCreation) => await columnApi.create(columnCreation)
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({id, columnUpdate}: { id: number, columnUpdate: IColumnUpdate }) => await columnApi.update(id, columnUpdate)
);

export const updateColumnTitle = (id: number, title: string) => updateColumn({ id, columnUpdate: { title }});

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id: number) => {
    await columnApi.delete(id);
    return id;
  }
);

export const columnAdapter = createEntityAdapter<IColumn>({
  selectId: column => column.id,
});

export const columnSelectors = columnAdapter.getSelectors();

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnAdapter.getInitialState(),
  reducers: {
    columnAdded: columnAdapter.addOne,
    columnsReceived(state, action) {
      columnAdapter.setAll(state, action.payload.columns)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadColumn.fulfilled, (state, action) => {
        columnAdapter.upsertOne(state, action.payload);
      })
      .addCase(loadColumn.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(loadColumns.fulfilled, (state, action) => {
        columnAdapter.removeAll(state);
        columnAdapter.addMany(state, action.payload);
      })
      .addCase(loadColumns.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        columnAdapter.addOne(state, action.payload);
      })
      .addCase(createColumn.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        columnAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        });
      })
      .addCase(updateColumn.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        columnAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        console.error(action.error);
      })
  }
});

export const { columnAdded, columnsReceived } = columnsSlice.actions;

const columnsReducer = columnsSlice.reducer;

export default columnsReducer;
