import { createActionGroup, props, emptyProps } from "@ngrx/store";

export const AuthActions = createActionGroup({
	source: 'auth',
	events: {
		signup: props<{ username: string; password: string }>(),
		login: props<{ username: string; password: string }>(),
		logout: emptyProps(),
	},
});