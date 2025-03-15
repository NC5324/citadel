import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class SearchService {
    private readonly store = inject(Store);

    public query = '';

    search(): void {
        if (this.query) {
            // this.store.dispatch(BooksActions.search({ query: this.query }));
        }
    }

}