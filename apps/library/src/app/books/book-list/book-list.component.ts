import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { booksFeature } from '../store/books.feature';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  readonly store = inject(Store);
  readonly searchQuery = toSignal(this.store.select(booksFeature.selectSearchQuery));
}
