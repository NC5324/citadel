import { Route } from "@angular/router";

export const userRoutes: Route[] = [
    {
        path: 'favorites',
        loadComponent: () => import('./favorites-list/favorites-list.component').then((c) => c.FavoritesListComponent),
    },
]