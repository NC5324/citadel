import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BooksActions } from '../../books/store/books.actions';
import { booksFeature, Book } from '../../books/store/books.feature';
import { UserActions } from '../store/user.actions';
import { userFeature } from '../store/user.feature';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  readonly store = inject(Store);
  readonly destroyRef = inject(DestroyRef);

  readonly searchQuery = signal('');
  private readonly subjectRegex = /^[A-Za-z]+$/g;

  readonly favorites = toSignal(this.store.select(userFeature.selectFavorites));

  @HostListener('window:keydown.enter')
  handleKeyDown() {
    this.search(this.searchQuery());
  }

  bookTags(book: Book): string[] {
    let tags = book.subject?.filter((s) => this.subjectRegex.test(s))?.slice(0, 5) ?? [];
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

  addFavorite(bookId: string): void {
    this.store.dispatch(UserActions.addFavorite({ bookId }));
  }

  removeFavorite(bookId: string): void {
    this.store.dispatch(UserActions.removeFavorite({ bookId }));
  }

  showMore(query: string): void {
    this.store.dispatch(BooksActions.showMore({ query }));
  }
}
