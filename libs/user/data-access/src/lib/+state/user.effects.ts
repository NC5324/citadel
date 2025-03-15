import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, EMPTY, filter, exhaustMap } from 'rxjs';
import { UserService } from '../user.service';
import { UserActions, userFeature } from './user.store';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly store = inject(Store);

  loadUser$ = createEffect(() => {
    return (
      this,
      this.actions$.pipe(
        ofType(UserActions.loadUser),
        switchMap(() =>
          this.userService.loadCurrentUser$().pipe(
            map((user) => UserActions.loadUserSuccess({ user })),
            catchError((err) => {
              console.error(err);
              return EMPTY;
            })
          )
        )
      )
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addFavorite),
      concatLatestFrom(() =>
        this.store.select(userFeature.selectUser).pipe(filter((user) => !!user))
      ),
      exhaustMap(([{ book }, user]) =>
        this.userService.addFavorite$(user.id, book.key).pipe(
          map((favoriteIds) => UserActions.addFavoriteSuccess({ favoriteIds })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        )
      )
    );
  });

  removeFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addFavorite),
      concatLatestFrom(() =>
        this.store.select(userFeature.selectUser).pipe(filter((user) => !!user))
      ),
      exhaustMap(([{ book }, user]) =>
        this.userService.removeFavorite$(user.id, book.key).pipe(
          map((favoriteIds) =>
            UserActions.removeFavoriteSuccess({ favoriteIds })
          ),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        )
      )
    );
  });
}
