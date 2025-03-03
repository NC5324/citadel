import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule, JsonPipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { lucideEye, lucideHeart, lucideSearch } from '@ng-icons/lucide';
import { Book, booksFeature } from '../store/books.feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksActions } from '../store/books.actions';
import { HlmCardDirective } from '../../../../../../libs/shared/ui/ui-card-helm/src/lib/hlm-card.directive';
import { HlmCardHeaderDirective } from '../../../../../../libs/shared/ui/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardFooterDirective } from '../../../../../../libs/shared/ui/ui-card-helm/src/lib/hlm-card-footer.directive';
import { HlmCardDescriptionDirective } from '../../../../../../libs/shared/ui/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmBadgeDirective } from '../../../../../../libs/shared/ui/ui-badge-helm/src/lib/hlm-badge.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIcon,
    HlmIconDirective,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardDescriptionDirective,
    HlmCardFooterDirective,
    HlmBadgeDirective,
  ],
  providers: [provideIcons({ lucideSearch, lucideHeart, lucideEye })],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
  readonly store = inject(Store);
  readonly location = inject(Location);
  readonly destroyRef = inject(DestroyRef);

  readonly searchQuery = signal('');
  private readonly subjectRegex = /^[A-Za-z]+$/g;

  readonly books = toSignal(this.store.select(booksFeature.selectBooks));
  readonly hasMore = toSignal(this.store.select(booksFeature.selectHasMore));

  ngOnInit(): void {
    const { search } = this.location.getState() as { search?: string };
    this.searchQuery.set(search ?? '');
    this.search(this.searchQuery());
  }

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

  showMore(query: string): void {
    this.store.dispatch(BooksActions.showMore({ query }));
  }

}
