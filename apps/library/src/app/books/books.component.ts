import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { provideIcons } from '@ng-icons/core';
import {
  lucideEye,
  lucideHeart,
  lucideHeartCrack,
  lucideSearch,
} from '@ng-icons/lucide';
import { Book, booksFeature } from './store/books.feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksActions } from './store/books.actions';
import { UserActions } from '../user/store/user.actions';
import { userFeature } from '../user/store/user.feature';
import { BookListComponent } from '@citadel/books';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-books',
  imports: [CommonModule, BookListComponent, HlmButtonDirective],
  providers: [
    provideIcons({ lucideSearch, lucideHeart, lucideHeartCrack, lucideEye }),
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit {
  readonly store = inject(Store);
  readonly location = inject(Location);

  public searchQuery = '';

  readonly books = toSignal(this.store.select(booksFeature.selectBooks));
  readonly hasMore = toSignal(this.store.select(booksFeature.selectHasMore));
  readonly favoriteIds = toSignal(
    this.store.select(userFeature.selectFavoriteIds)
  );

  ngOnInit(): void {
    const { search } = this.location.getState() as { search?: string };
    this.searchQuery = search ?? '';
    this.search(this.searchQuery);
  }

  search(query: string): void {
    if (query) {
      this.store.dispatch(BooksActions.search({ query }));
    }
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
