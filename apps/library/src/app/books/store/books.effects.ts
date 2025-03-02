import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "./books.service";
import { catchError, EMPTY, map, switchMap } from "rxjs";
import { BooksActions } from "./books.actions";

@Injectable()
export class BooksEffects {
    private readonly actions$ = inject(Actions);
    private readonly booksService = inject(BooksService);
    
    loadSearchResults$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksActions.search),
            switchMap(({ query }) => this.booksService.searchBooks$(query).pipe(
                map((books) => BooksActions.searchSuccess({ books })),
                catchError(() => EMPTY)
            )),
        );
    });

    showMoreResults$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksActions.showMore),
            switchMap(({ query }) => this.booksService.searchBooks$(query).pipe(
                map((books) => BooksActions.showMoreSuccess({ books })),
                catchError(() => EMPTY),
            )),
        );
    });
}