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

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideState(userFeature),
    provideState(booksFeature),
    provideEffects(AuthEffects),
    provideEffects(UserEffects),
    provideEffects(BookEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
  ],
};
