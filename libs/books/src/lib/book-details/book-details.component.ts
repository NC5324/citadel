import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'apps/library/src/app/books/store/books.feature';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideHeart, lucideHeartCrack, lucideEye } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardDescriptionDirective, HlmCardFooterDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { userFeature } from '../../../../../apps/library/src/app/user/store/user.feature';
import { BooksService } from '../../../../../apps/library/src/app/books/store/books.service';
import { shareReplay, switchMap } from 'rxjs';
import { UserActions } from 'apps/library/src/app/user/store/user.actions';

@Component({
  selector: 'lib-book-details',
  imports: [
    CommonModule,
    RouterModule,
    NgIcon,
    HlmIconDirective,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardDescriptionDirective,
    HlmBadgeDirective,
  ],
  providers: [provideIcons({ lucideSearch, lucideHeart, lucideHeartCrack, lucideEye })],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {
  readonly store = inject(Store);
  readonly route = inject(ActivatedRoute);
  readonly bookService = inject(BooksService);
    
  readonly favoriteIds = toSignal(this.store.select(userFeature.selectFavoriteIds));

  readonly book$ = this.route.params.pipe(
    switchMap((params) => this.bookService.loadBook$(params['id'])),
    shareReplay(1),
  );

  description(book: Book): string {
    if (!book.description) {
      return '';
    }
    if (typeof book.description === 'string') {
      return book.description;
    }
    return book.description.value;
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

}
