import { inject, Injectable } from "@angular/core";
import { UserActions } from "libs/user/data-access/src/lib/+state/user.store";
import { exhaustMap, map, catchError, EMPTY } from "rxjs";
import { AuthActions } from "./auth.store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects {
	private readonly actions$ = inject(Actions);
	private readonly authService = inject(AuthService);

	signup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.signup),
			exhaustMap(({ username, password }) =>
				this.authService.signup$(username, password).pipe(
					map(() => UserActions.resetUser()),
                    catchError((err) => {
                        console.error(err);
                        return EMPTY;
                    }),
				)
			)
		);
	});

	login$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.login),
			exhaustMap(({ username, password }) =>
				this.authService.login$(username, password).pipe(
					map((user) => UserActions.loadUserSuccess({ user })),
                    catchError((err) => {
                        console.error(err);
                        return EMPTY;
                    }),
				)
			)
		);
	});

	logout$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.logout),
			exhaustMap(() =>
				this.authService.logout$().pipe(
					map(() => UserActions.resetUser()),
                    catchError((err) => {
                        console.error(err);
                        return EMPTY;
                    }),
				)
			)
		);
	});
}