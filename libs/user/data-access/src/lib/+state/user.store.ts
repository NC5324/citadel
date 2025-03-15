import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
} from '@ngrx/store';
import { Book } from '@citadel/books/data-access';
import { User } from '@citadel/user/data-access';

interface State {
  user: User | null;
  favoriteIds: string[];
  favorites: Book[];
}

const initialState: State = {
  user: null,
  favoriteIds: [],
  favorites: [],
};

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    resetUser: emptyProps(),
    loadUser: emptyProps(),
    loadUserSuccess: props<{ user: User }>(),
    addFavorite: props<{ book: Book }>(),
    addFavoriteSuccess: props<{ favoriteIds: string[] }>(),
    removeFavorite: props<{ book: Book }>(),
    removeFavoriteSuccess: props<{ favoriteIds: string[] }>(),
  },
});

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
