import { inject, Injectable } from '@angular/core';
import { BookFacade } from '@citadel/books/data-access';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly bookFacade = inject(BookFacade);

  public query = '';

  search(): void {
    if (this.query) {
      this.bookFacade.search(this.query);
    }
  }
}
