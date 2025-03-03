import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, input, model, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardDescriptionDirective, HlmCardFooterDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { lucideEye, lucideHeart, lucideHeartCrack, lucideSearch } from '@ng-icons/lucide';
import { Book } from '../../../../../apps/library/src/app/books/store/books.feature';

@Component({
  selector: 'lib-book-list',
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
  providers: [provideIcons({ lucideSearch, lucideHeart, lucideHeartCrack, lucideEye })],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibBookListComponent {

  readonly books = input<Book[]>();
  readonly hasMore = input<boolean>();
  readonly favoriteIds = input<string[]>();
  readonly searchQuery = model<string>('');
  readonly disableSearch = input<boolean>();
  readonly disableEmpty = input<boolean>();

  @Output()
  readonly showMore = new EventEmitter();

  @Output()
  readonly addFavorite = new EventEmitter();

  @Output()
  readonly removeFavorite = new EventEmitter();

  @Output()
  readonly search = new EventEmitter();

  private readonly subjectRegex = /^[A-Za-z]+$/g;

  @HostListener('window:keydown.enter')
  handleKeyDown() {
    this.onSearch(this.searchQuery());
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

  onSearch(query: string): void {
    if (query) {
      this.search.emit({ query });
    }
  }

  isFavorite(bookId: string, favorites: string[] | undefined): boolean {
    return !!favorites?.includes(bookId);
  }

  onAddFavorite(book: Book): void {
    this.addFavorite.emit({ book });
  }

  onRemoveFavorite(book: Book): void {
    this.removeFavorite.emit({ book });
  }

  onShowMore(query: string): void {
    this.showMore.emit({ query });
  }

}
