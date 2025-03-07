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
import { UserEffects } from './user/store/user.effects';
import { userFeature } from './user/store/user.feature';
import { booksFeature } from './books/store/books.feature';
import { BooksEffects } from './books/store/books.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideState(userFeature),
    provideEffects(UserEffects),
    provideState(booksFeature),
    provideEffects(BooksEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
  ],
};
