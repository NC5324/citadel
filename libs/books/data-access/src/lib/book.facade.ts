import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksActions, booksFeature } from './+state/book.store';
import { filter, map, shareReplay } from 'rxjs';
import { Book } from './models/book.interface';

@Injectable({ providedIn: 'root' })
export class BookFacade {
  private readonly store = inject(Store);
  private readonly relevantTagRegex = /^[A-Za-z]+$/g;

  readonly books$ = this.store.select(booksFeature.selectBooks);
  readonly hasMore$ = this.store.select(booksFeature.selectHasMore);

  readonly currentBook$ = this.store
    .select(booksFeature.selectSelectedBook)
    .pipe(filter((book) => !!book));

  readonly currentBookDescription$ = this.currentBook$.pipe(
    map((book) => {
      if (!book.description) {
        return '';
      }
      if (typeof book.description === 'string') {
        return book.description;
      }
      return book.description.value;
    }),
    shareReplay({
      bufferSize: 1,
      refCount: true,
    })
  );

  tags(book: Book): string[] {
    let tags: string[] = [];
    if (book.subject) {
      tags = book.subject.filter((s) => this.relevantTagRegex.test(s));
      tags = tags.slice(0, 5);
    }
    if (!tags.length) {
      tags = book.subject?.slice(0, 2) ?? [];
    }
    const more = (book.subject?.length ?? 0) - tags.length;
    if (more) {
      tags = tags.concat(`+${more} more`);
    }
    return tags;
  }

  search(query: string): void {
    this.store.dispatch(BooksActions.search({ query }));
  }

  showMore(query: string): void {
    this.store.dispatch(BooksActions.showMore({ query }));
  }
}
