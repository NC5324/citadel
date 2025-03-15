import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserActions, userFeature } from "./+state/user.store";
import { Book } from "@citadel/books/data-access";

@Injectable({ providedIn: 'root' })
export class UserFacade {
    private readonly store = inject(Store);

    readonly currentUser$ = this.store.select(userFeature.selectUser);
    readonly favoriteIds$ = this.store.select(userFeature.selectFavoriteIds);
    readonly favorites$ = this.store.select(userFeature.selectFavorites);

    isFavorite(book: Book, favoriteIds: string[]): boolean {
        return favoriteIds.includes(book.key);
    }

    addFavorite(book: Book): void {
        this.store.dispatch(UserActions.addFavorite({ book }));
    }

    removeFavorite(book: Book): void {
        this.store.dispatch(UserActions.removeFavorite({ book }));
    }

}