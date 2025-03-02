import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
	source: 'Action',
	events: {
		signup: props<{ username: string; password: string }>(),
		login: props<{ username: string; password: string }>(),
		logout: emptyProps(),
	},
});
