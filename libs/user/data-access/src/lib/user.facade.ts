import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserActions, userFeature } from "./+state/user.store";
import { Book } from "@citadel/books/data-access";
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UserFacade {
    private readonly store = inject(Store);

    readonly currentUser$ = this.store.select(userFeature.selectUser);
    readonly favorites$ = this.store.select(userFeature.selectFavorites);

    private readonly favoriteIds = toSignal(this.store.select(userFeature.selectFavoriteIds), { initialValue: [] });

    isFavorite(book: Book): boolean {
        return this.favoriteIds().includes(book.key);
    }

    addFavorite(book: Book): void {
        this.store.dispatch(UserActions.addFavorite({ book }));
    }

    removeFavorite(book: Book): void {
        this.store.dispatch(UserActions.removeFavorite({ book }));
    }

}