import { Route } from '@angular/router';
import { bookRoutes } from './books/books.routes';
import { authRoutes } from './auth/auth.routes';
import { userRoutes } from './user/user.routes';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'user',
        children: userRoutes,
    },
    {
        path: 'auth',
        children: authRoutes,
    },
    {
        path: 'books',
        children: bookRoutes,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
