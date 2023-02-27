import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Client from '../../api/Client';
import ColumnApi from '../../api/ColumnApi';
import { IColumn, IColumnCreation, IColumnUpdate } from '../../types/types';
import { AppDispatch, GetRootState } from '../store';

interface IColumnBeforeInsertion {
  insertedColumn: IColumn;
  beforeColumn: IColumn;
}

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

export function updateColumnTitle(id: number, title: string) {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    const state = getState();
    const column = columnSelectors.selectById(state.columns, id);
    if(column === undefined) {
      return
    }
    await dispatch( updateColumn({ id, columnUpdate: { ...column, title } }));
  }
}

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id: number) => {
    await columnApi.delete(id);
    return id;
  }
);

export const columnAdapter = createEntityAdapter<IColumn>({
  selectId: column => column.id,
  sortComparer: (columnA, columnB) => columnA.order - columnB.order
});

export const columnSelectors = columnAdapter.getSelectors();

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnAdapter.getInitialState(),
  reducers: {
    insertColumnBefore(state, action: PayloadAction<IColumnBeforeInsertion>) {
      const insertedColumn = action.payload.insertedColumn
      const beforeColumn = action.payload.beforeColumn
      const columns = columnSelectors.selectAll(state);

      let index = 1;
      columns.forEach((column) => {
        if(column.id === beforeColumn.id) {
          columnAdapter.updateOne(state, {
            id: insertedColumn.id,
            changes: {
              ...insertedColumn,
              order: index++,
            }
          })
          columnAdapter.updateOne(state, {
            id: beforeColumn.id,
            changes: {
              ...beforeColumn,
              order: index++,
            }
          })
        } else if (column.id !== insertedColumn.id) {
          columnAdapter.updateOne(state, {
            id: column.id,
            changes: {
              ...column,
              order: index++,
            }
          })
        }
      })
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

export function insertColumnBefore(insertedColumn: IColumn, beforeColumn: IColumn) {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    const oldState = getState();
    await dispatch(columnsSlice.actions.insertColumnBefore({insertedColumn, beforeColumn}));
    const state = getState();
    const columns = columnSelectors.selectAll(state.columns);
    for (const column of columns) {
      const oldColumn = columnSelectors.selectById(oldState.columns, column.id)
      if (oldColumn !== undefined && oldColumn.order !== column.order) {
        await dispatch(updateColumn({
          id : column.id,
          columnUpdate: column
        }))
      }
    }
  }
}

const columnsReducer = columnsSlice.reducer;

export default columnsReducer;
