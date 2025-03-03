import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BooksActions } from '../../books/store/books.actions';
import { Book } from '../../books/store/books.feature';
import { UserActions } from '../store/user.actions';
import { userFeature } from '../store/user.feature';
import { BookListComponent } from '@citadel/books';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, BookListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  readonly store = inject(Store);
  readonly destroyRef = inject(DestroyRef);

  readonly searchQuery = '';
  private readonly subjectRegex = /^[A-Za-z]+$/g;

  readonly favorites = toSignal(this.store.select(userFeature.selectFavorites));
  readonly favoriteIds = toSignal(
    this.store.select(userFeature.selectFavoriteIds)
  );

  @HostListener('window:keydown.enter')
  handleKeyDown() {
    this.search(this.searchQuery);
  }

  bookTags(book: Book): string[] {
    let tags =
      book.subject?.filter((s) => this.subjectRegex.test(s))?.slice(0, 5) ?? [];
    if (!tags.length) {
      tags = book.subject?.slice(0, 2) ?? [];
    }
    const more = (book.subject?.length ?? 0) - tags.length;
    if (more) {
      tags = tags.concat(`+${more} more`);
    }
    return tags;
  }

  bookId(book: Book): string {
    return book.key.split('/')[2];
  }

  search(query: string): void {
    if (query) {
      this.store.dispatch(BooksActions.search({ query }));
    }
  }

  isFavorite(bookId: string, favorites: string[] | undefined): boolean {
    return !!favorites?.includes(bookId);
  }

  addFavorite(book: Book): void {
    this.store.dispatch(UserActions.addFavorite({ book }));
  }

  removeFavorite(book: Book): void {
    this.store.dispatch(UserActions.removeFavorite({ book }));
  }

  showMore(query: string): void {
    this.store.dispatch(BooksActions.showMore({ query }));
  }
}
