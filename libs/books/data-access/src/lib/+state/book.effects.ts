import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, EMPTY, filter } from 'rxjs';
import { BooksService } from '../book.service';
import { BooksActions, booksFeature } from './book.store';
import { routerNavigatedAction } from '@ngrx/router-store';

@Injectable()
export class BookEffects {
  private readonly actions$ = inject(Actions);
  private readonly booksService = inject(BooksService);
  private readonly store = inject(Store);

  loadSelectedBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.event.url.startsWith('/books/')),
      map(({ payload }) => payload.event.url.split('/')[2]),
      switchMap((id) =>
        this.booksService.loadBook$(id).pipe(
          map((book) => BooksActions.loadBookSuccess({ book })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          }),
        ),
      )
    );
  });

  loadSearchResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.search),
      concatLatestFrom(() => this.store.select(booksFeature.selectPageSize)),
      switchMap(([{ query }, pageSize]) =>
        this.booksService.searchBooks$(query, 1, pageSize).pipe(
          map((res) =>
            BooksActions.searchSuccess({
              books: res.docs,
              hasMore: res.numFound - res.start > pageSize,
              page: 1,
            })
          ),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        )
      )
    );
  });

  showMoreResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.showMore),
      concatLatestFrom(() => [
        this.store.select(booksFeature.selectPage),
        this.store.select(booksFeature.selectPageSize),
      ]),
      switchMap(([{ query }, page, pageSize]) =>
        this.booksService.searchBooks$(query, page, pageSize).pipe(
          map((res) =>
            BooksActions.showMoreSuccess({
              books: res.docs,
              hasMore: res.numFound - res.start > pageSize,
              page: page + 1,
            })
          ),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        )
      )
    );
  });
}
