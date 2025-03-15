import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "./models/user.interface";
import { userFeature } from "./+state/user.store";

@Injectable({ providedIn: 'root' })
export class UserFacade {
    private readonly store = inject(Store);

    currentUser$(): Observable<User | null> {
        return this.store.select(userFeature.selectUser);
    }

}