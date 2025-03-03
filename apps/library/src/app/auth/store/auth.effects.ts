import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserActions } from '../../user/store/user.actions';

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
					catchError(() => EMPTY)
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
					catchError(() => EMPTY)
				)
			)
		);
	});

	logout$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.logout),
			exhaustMap(() =>
				this.authService.logout$().pipe(
					tap(() => console.log('???')),
					map(() => UserActions.resetUser()),
					catchError(() => EMPTY)
				)
			)
		);
	});
}
