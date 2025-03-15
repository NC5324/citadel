import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFacade } from '@citadel/user/data-access';
import { Book, BookFacade } from '@citadel/books/data-access';
import { RouterModule } from '@angular/router';
import { BookListElementComponent } from '@citadel/book-list-element';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideHeartCrack, lucideEye } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'lib-favorite-list',
  imports: [
    CommonModule,
    RouterModule,
    BookListElementComponent,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideHeart, lucideHeartCrack, lucideEye })],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteListComponent {
  private readonly bookFacade = inject(BookFacade);
  private readonly userFacade = inject(UserFacade);

  readonly books$ = this.userFacade.favorites$;

  tags(book: Book): string[] {
    return this.bookFacade.tags(book);
  }

  isFavorite(book: Book): boolean {
    return this.userFacade.isFavorite(book);
  }

  addFavorite(book: Book): void {
    this.userFacade.addFavorite(book);
  }

  removeFavorite(book: Book): void {
    this.userFacade.removeFavorite(book);
  }
}
