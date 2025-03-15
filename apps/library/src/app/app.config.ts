import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { UserEffects, userFeature } from '@citadel/user/data-access';
import { booksFeature, BookEffects } from '@citadel/books/data-access';
import { AuthEffects } from '@citadel/auth/data-access';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(AuthEffects, UserEffects, BookEffects),
    provideState(userFeature),
    provideState(booksFeature),
  ],
};
