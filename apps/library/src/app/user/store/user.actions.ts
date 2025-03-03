import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "./user.feature";
import { Book } from "../../books/store/books.feature";

export const UserActions = createActionGroup({
  source: 'User',
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
