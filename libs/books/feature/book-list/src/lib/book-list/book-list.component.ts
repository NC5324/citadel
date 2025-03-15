import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListElementComponent } from '@citadel/book-list-element';
import { Book, BookFacade } from '@citadel/books/data-access';
import { UserFacade } from '@citadel/user/data-access';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideHeart, lucideHeartCrack } from '@ng-icons/lucide';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../../../../../../apps/library/src/app/services/search.service';

@Component({
  selector: 'lib-book-list',
  imports: [
    CommonModule,
    RouterModule,
    BookListElementComponent,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideHeart, lucideHeartCrack, lucideEye })],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  private readonly bookFacade = inject(BookFacade);
  private readonly userFacade = inject(UserFacade);
  private readonly searchService = inject(SearchService);

  readonly books$ = this.bookFacade.books$;
  readonly hasMore$ = this.bookFacade.hasMore$;
  readonly favoriteIds$ = this.userFacade.favoriteIds$;

  tags(book: Book): string[] {
    return this.bookFacade.tags(book);
  }

  isFavorite(book: Book, favoriteIds: string[]): boolean {
    return this.userFacade.isFavorite(book, favoriteIds);
  }

  addFavorite(book: Book): void {
    this.userFacade.addFavorite(book);
  }

  removeFavorite(book: Book): void {
    this.userFacade.removeFavorite(book);
  }

  showMore(): void {
    this.bookFacade.showMore(this.searchService.query);
  }

}
