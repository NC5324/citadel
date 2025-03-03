import { Route } from "@angular/router";
import { provideState } from "@ngrx/store";
import { booksFeature } from "./store/books.feature";
import { provideEffects } from "@ngrx/effects";
import { BooksEffects } from "./store/books.effects";
import { UserEffects } from "../user/store/user.effects";
import { userFeature } from "../user/store/user.feature";

export const bookRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./book-list/book-list.component').then((c) => c.BookListComponent),
        providers: [
            provideState(booksFeature),
            provideEffects(BooksEffects),
            provideState(userFeature),
            provideEffects(UserEffects),
        ],
    },
    {
        path: ':id',
        loadComponent: () => import('libs/books/src/lib/book-details/book-details.component').then((c) => c.BookDetailsComponent),
    },
]