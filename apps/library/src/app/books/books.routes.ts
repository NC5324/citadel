import { Route } from "@angular/router";
import { provideState } from "@ngrx/store";
import { booksFeature } from "./store/books.feature";
import { provideEffects } from "@ngrx/effects";
import { BooksEffects } from "./store/books.effects";

export const bookRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./book-list/book-list.component').then((c) => c.BookListComponent),
        providers: [
            provideState(booksFeature),
            provideEffects(BooksEffects),
        ],
    },
    {
        path: ':id',
        loadComponent: () => import('./book-details/book-details.component').then((c) => c.BookDetailsComponent),
    },
]