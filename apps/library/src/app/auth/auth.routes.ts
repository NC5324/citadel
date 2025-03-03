import { Route } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { AuthEffects } from "./store/auth.effects";
import { provideState } from "@ngrx/store";
import { userFeature } from "../user/store/user.feature";
import { UserEffects } from "../user/store/user.effects";

export const authRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
        providers: [
            provideState(userFeature),
            provideEffects(AuthEffects),
            provideEffects(UserEffects),
        ],
    },
    {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent),
    },
];