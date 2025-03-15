import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { userFeature } from './user/store/user.feature';

const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(userFeature.selectUser).pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('/auth/login', {
          state: { returnUrl: state.url },
        });
        return false;
      }
      return true;
    })
  );
};

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'user',
    children: [
      {
        path: 'favorites',
        pathMatch: 'full',
        loadComponent: () =>
          import('@citadel/favorite-list').then((m) => m.FavoriteListComponent),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () =>
          import('@citadel/login').then((c) => c.LoginComponent),
      },
      {
        path: 'signup',
        pathMatch: 'full',
        loadComponent: () =>
          import('@citadel/signup').then((c) => c.SignupComponent),
      },
    ],
  },
  {
    path: 'books',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('@citadel/book-list').then((c) => c.BookListComponent),
      },
      {
        path: ':id',
        pathMatch: 'full',
        loadComponent: () =>
          import('@citadel/book-details').then((c) => c.BookDetailsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
