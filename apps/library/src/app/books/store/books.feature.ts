import { createFeature, createReducer, on } from "@ngrx/store";
import { BooksActions } from "./books.actions";

export interface Book {
    id: string;
    title: string;
    authors: string[];
    tags: string[];
    coverId: string;
}

export interface State {
    books: Book[];
    selectedBookId: string | undefined;
    searchQuery: string | undefined;
    searchLimit: number;
    searchPage: number;
}

const initialState: State = {
    books: [],
    selectedBookId: undefined,
    searchQuery: undefined,
    searchLimit: 25,
    searchPage: 1,
}

export const booksFeature = createFeature({
    name: 'books',
    reducer: createReducer(
        initialState,
        on(BooksActions.search, (state, { query }) => ({
            ...state,
            searchQuery: query,
        })),
        on(BooksActions.searchSuccess, (state, { books }) => ({
            ...state,
            books,
        })),
        on(BooksActions.showMoreSuccess, (state, { books }) => ({
            ...state,
            books: state.books.concat(books),
        })),
    ),
});