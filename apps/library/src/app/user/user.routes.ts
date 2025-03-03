import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { userFeature } from "./store/user.feature";
import { map } from "rxjs";

const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store);
    const router = inject(Router);
    return store.select(userFeature.selectUser).pipe(
        map((user) => {
            if (!user) {
                router.navigateByUrl('/auth/login', { state: { returnUrl: state.url } });
                return false;
            }
            return true;
        }),
    );
};

export const userRoutes: Route[] = [
    {
        path: 'favorites',
        loadComponent: () => import('./favorites-list/favorites-list.component').then((c) => c.FavoritesListComponent),
        canActivate: [authGuard],
    },
]