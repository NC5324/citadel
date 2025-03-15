import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Book, BookFacade } from '@citadel/books/data-access';
import { lucideSearch, lucideHeart, lucideHeartCrack, lucideEye } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardDescriptionDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { RouterModule } from '@angular/router';
import { UserFacade } from '@citadel/user/data-access';
import { filter, Observable } from 'rxjs';

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
  readonly bookFacade = inject(BookFacade);
  readonly userFacade = inject(UserFacade);
    
  readonly book$ = this.bookFacade.currentBook$;
  readonly bookDescription$ = this.bookFacade.currentBookDescription$;

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
