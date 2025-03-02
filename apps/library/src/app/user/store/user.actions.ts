import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "./user.feature";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    loadUser: emptyProps(),
    loadUserSuccess: props<{ user: User }>(),
    addFavorite: props<{ bookId: string }>(),
    addFavoriteSuccess: props<{ favorites: string[] }>(),
    removeFavorite: props<{ bookId: string }>(),
    removeFavoriteSuccess: props<{ favorites: string[] }>(),
  },
});
