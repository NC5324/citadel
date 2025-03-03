import { createFeature, createReducer, on } from '@ngrx/store';
import { BooksActions } from './books.actions';

export interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_i: string;
  subject: string[];
}

export interface State {
  books: Book[];
  hasMore: boolean;
  page: number;
  pageSize: number;
  selectedBookId: string | undefined;
}

const initialState: State = {
  books: [],
  hasMore: true,
  page: 1,
  pageSize: 16,
  selectedBookId: undefined,
};

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
