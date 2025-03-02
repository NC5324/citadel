import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "./user.service";
import { UserActions } from "./user.actions";
import { catchError, EMPTY, exhaustMap, filter, map, switchMap } from "rxjs";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { userFeature } from "./user.feature";

@Injectable()
export class UserEffects {
    private readonly actions$ = inject(Actions);
    private readonly userService = inject(UserService);
    private readonly store = inject(Store);

    loadUser$ = createEffect(() => {
        return this,this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap(() => this.userService.loadCurrentUser$().pipe(
                map((user) => UserActions.loadUserSuccess({ user })),
                catchError(() => EMPTY),
            )),
        );
    });

    addFavorite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.addFavorite),
            concatLatestFrom(() => this.store.select(userFeature.selectUser).pipe(
                filter((user) => !!user),
            )),
            exhaustMap(([{ bookId }, user]) => this.userService.addFavorite$(user.id, bookId).pipe(
                map((favorites) => UserActions.addFavoriteSuccess({ favorites })),
                catchError(() => EMPTY),
            )),
        );
    });

    removeFavorite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.addFavorite),
            concatLatestFrom(() => this.store.select(userFeature.selectUser).pipe(
                filter((user) => !!user),
            )),
            exhaustMap(([{ bookId }, user]) => this.userService.removeFavorite$(user.id, bookId).pipe(
                map((favorites) => UserActions.removeFavoriteSuccess({ favorites })),
                catchError(() => EMPTY),
            )),
        );
    });
}