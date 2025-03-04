import { inject, Injectable, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { BooksActions } from "../books/store/books.actions";

@Injectable({ providedIn: 'root' })
export class SearchService {
    private readonly store = inject(Store);

    public query = '';

    search(): void {
        if (this.query) {
            this.store.dispatch(BooksActions.search({ query: this.query }));
        }
    }

}