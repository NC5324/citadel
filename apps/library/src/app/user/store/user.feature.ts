import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { Book } from '../../books/store/books.feature';

export interface User {
  id: number;
  username: string;
  favorites: string[];
}

export interface State {
  user: User | null;
  favoriteIds: string[];
  favorites: Book[];
}

const initialState: State = {
  user: null,
  favoriteIds: [],
  favorites: [],
};

export const userFeature = createFeature({
  name: 'User',
  reducer: createReducer(
    initialState,
    on(UserActions.resetUser, () => ({
      ...initialState,
    })),
    on(UserActions.loadUserSuccess, (state, { user }) => ({
      ...state,
      user,
    })),
    // temp
    on(UserActions.addFavorite, (state, { book }) => ({
      ...state,
      favoriteIds: state.favoriteIds
        .filter((favorite) => favorite !== book.key)
        .concat(book.key),
      favorites: state.favorites
        .filter((favorite) => favorite.key !== book.key)
        .concat(book),
    })),
    // temp
    on(UserActions.removeFavorite, (state, { book }) => ({
      ...state,
      favoriteIds: state.favoriteIds.filter(
        (favorite) => favorite !== book.key
      ),
      favorites: state.favorites.filter(
        (favorite) => favorite.key !== book.key
      ),
    })),
    on(
      UserActions.addFavoriteSuccess,
      UserActions.removeFavoriteSuccess,
      (state, { favoriteIds }) => ({
        ...state,
        favoriteIds,
      })
    )
  ),
});
