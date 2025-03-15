import {
  createActionGroup,
  createFeature,
  createReducer,
  on,
  props,
} from '@ngrx/store';
import { Book } from '../models/book.interface';

interface State {
  books: Book[];
  hasMore: boolean;
  page: number;
  pageSize: number;
  selectedBook: Book | null;
}

const initialState: State = {
  books: [],
  hasMore: true,
  page: 1,
  pageSize: 16,
  selectedBook: null,
};

export const BooksActions = createActionGroup({
  source: 'books',
  events: {
    search: props<{ query: string }>(),
    searchSuccess: props<{ books: Book[]; page: number; hasMore: boolean }>(),
    showMore: props<{ query: string }>(),
    showMoreSuccess: props<{ books: Book[]; page: number; hasMore: boolean }>(),
  },
});

export const booksFeature = createFeature({
  name: 'books',
  reducer: createReducer(
    initialState,
    on(BooksActions.searchSuccess, (state, { books, hasMore, page }) => ({
      ...state,
      books,
      hasMore,
      page,
    })),
    on(BooksActions.showMoreSuccess, (state, { books, hasMore, page }) => ({
      ...state,
      books: state.books.concat(books),
      hasMore,
      page,
    }))
  ),
});
