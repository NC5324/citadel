import { Route } from "@angular/router";
import { provideState } from "@ngrx/store";
import { booksFeature } from "./store/books.feature";

export const routes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./book-list/book-list.component').then((c) => c.BookListComponent),
        providers: [
            provideState(booksFeature),
        ],
    },
    {
        path: ':id',
        loadComponent: () => import('./book-details/book-details.component').then((c) => c.BookDetailsComponent),
        providers: [
            provideState(booksFeature),
        ],
    },
]