import { Route } from "@angular/router";

export const bookRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./book-list/book-list.component').then((c) => c.BookListComponent),
    },
    {
        path: ':id',
        loadComponent: () => import('./book-details/book-details.component').then((c) => c.BookDetailsComponent),
    },
]