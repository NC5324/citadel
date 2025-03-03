import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export interface User {
  id: number;
  username: string;
  email: string;
  favorites: string[];
}

export interface State {
  user: User | null;
  favorites: string[];
}

const initialState: State = {
  user: null,
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
    on(UserActions.addFavorite, (state, { bookId }) => ({
      ...state,
      favorites: state.favorites.filter((favorite) => favorite !== bookId).concat(bookId),
    })),
    // temp
    on(UserActions.removeFavorite, (state, { bookId }) => ({
      ...state,
      favorites: state.favorites.filter((favorite) => favorite !== bookId),
    })),
    on(
      UserActions.addFavoriteSuccess,
      UserActions.removeFavoriteSuccess,
      (state, { favorites }) => ({
        ...state,
        favorites,
      })
    )
  ),
});
