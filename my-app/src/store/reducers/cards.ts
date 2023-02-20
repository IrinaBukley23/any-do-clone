import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Client from '../../api/Client';
import CardApi, { ICard, ICardEdit } from '../../api/CardApi';
import { AppDispatch, GetRootState } from '../store';

interface ICardBeforeInsertion {
  insertedCard: ICard;
  beforeCard: ICard;
}

interface ICardColumnInsertion {
  insertedCard: ICard;
  columnId: number;
}

const cardApi = new CardApi(new Client());

export const loadCards = createAsyncThunk(
  'cards/getCards',
  async () => await cardApi.getAll()
);

export const loadCard = createAsyncThunk(
  'cards/getCard',
  async (id: number) => await cardApi.getOne(id)
);

export const createCard = createAsyncThunk(
  'cards/createCard',
  async (cardCreation: ICardEdit) => await cardApi.create(cardCreation)
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async ({id, cardUpdate}: { id: number, cardUpdate: ICardEdit }) => await cardApi.update(id, cardUpdate)
);

export function updateCardTitle(id: number, title: string) {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    const state = getState();
    const card = cardSelectors.selectById(state.cards, id);
    if(card === undefined) {
      return
    }
    await dispatch( updateCard({ id, cardUpdate: { ...card, title } }));
  }
}

export function updateCardDescription(id: number, description: string | undefined) {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    const state = getState();
    const card = cardSelectors.selectById(state.cards, id);
    if(card === undefined) {
      return
    }
    await dispatch( updateCard({ id, cardUpdate: { ...card, description } }));
  }
}

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (id: number) => {
    await cardApi.delete(id);
    return id;
  }
);

export const cardAdapter = createEntityAdapter<ICard>({
  selectId: card => card.id,
  sortComparer: (cardA, cardB) => cardA.order - cardB.order
});

export const cardSelectors = cardAdapter.getSelectors();

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardAdapter.getInitialState(),
  reducers: {
    insertCardBefore(state, action: PayloadAction<ICardBeforeInsertion>) {
      const insertedCard = action.payload.insertedCard
      const beforeCard = action.payload.beforeCard
      const cards = cardSelectors
        .selectAll(state)
        .filter((card) => card.columnId === beforeCard.columnId);

      let index = 1;
      cards.forEach((card) => {
        if(card.id === beforeCard.id) {
          cardAdapter.updateOne(state, {
            id: insertedCard.id,
            changes: {
              ...insertedCard,
              order: index++,
              columnId: beforeCard.columnId
            }
          })
          cardAdapter.updateOne(state, {
            id: beforeCard.id,
            changes: {
              ...beforeCard,
              order: index++,
            }
          })
        } else if (card.id !== insertedCard.id) {
          cardAdapter.updateOne(state, {
            id: card.id,
            changes: {
              ...card,
              order: index++,
            }
          })
        }
      })
    },
    insertCardToColumn(state, action: PayloadAction<ICardColumnInsertion>) {
      const insertedCard = action.payload.insertedCard;
      const columnId = action.payload.columnId;
      const cards = cardSelectors
        .selectAll(state)
        .filter((card) => card.columnId === columnId);

      cardAdapter.updateOne(state, {
        id: insertedCard.id,
        changes: {
          ...insertedCard,
          columnId,
          order: 1,
        }
      })

      cards.forEach((card, index) => {
        cardAdapter.updateOne(state, {
          id: card.id,
          changes: {
            ...card,
            order: index + 2,
          }
        })
      })
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadCard.fulfilled, (state, action) => {
        cardAdapter.upsertOne(state, action.payload);
      })
      .addCase(loadCard.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(loadCards.fulfilled, (state, action) => {
        let cards = cardSelectors.selectAll(state);
        const orders = cards.reduce((orders, card) => {
          orders.set(card.id, card.order)
          return orders
        }, new Map<number, number>())

        cardAdapter.removeAll(state);
        cardAdapter.addMany(state, action.payload);

        cards = cardSelectors.selectAll(state);
        cards.forEach((card) => {
          cardAdapter.updateOne(state, {
            id: card.id,
            changes: {
              ...card,
              order: orders.get(card.id) ?? 0
            }
          })
        })
      })
      .addCase(loadCards.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(createCard.fulfilled, (state, action) => {
        cardAdapter.addOne(state, action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        cardAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        });
      })
      .addCase(updateCard.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        cardAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        console.error(action.error);
      })
  }
});

export function insertCardBefore(insertedCard: ICard, beforeCard: ICard) {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    await dispatch(cardsSlice.actions.insertCardBefore({insertedCard, beforeCard}));
    const state = getState();
    const card = cardSelectors.selectById(state.cards, insertedCard.id);
    if (card === undefined) {
      return
    };
    await dispatch(updateCard({
      id: insertedCard.id,
      cardUpdate: card
    }))
  }
}

export function insertCardToColumn(insertedCard: ICard, columnId: number) {
  return async (dispatch: AppDispatch, getState: GetRootState) => {
    await dispatch(cardsSlice.actions.insertCardToColumn({insertedCard, columnId}));
    const state = getState();
    const card = cardSelectors.selectById(state.cards, insertedCard.id);
    if(card === undefined) {
      return
    };
    await dispatch(updateCard({
      id: insertedCard.id,
      cardUpdate: card
    }))
  }
}

const cardsReducer = cardsSlice.reducer;

export default cardsReducer;
