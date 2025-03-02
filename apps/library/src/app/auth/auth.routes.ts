import { Route } from "@angular/router";

export const authRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent),
    },
];