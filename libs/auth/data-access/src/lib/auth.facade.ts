import { inject, Injectable } from '@angular/core';
import { UserFacade } from '@citadel/user/data-access';
import { Store } from '@ngrx/store';
import { map, shareReplay } from 'rxjs';
import { AuthActions } from './+state/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);
  private readonly userFacade = inject(UserFacade);

  readonly authenticated$ = this.userFacade.currentUser$.pipe(
    map((currentUser) => !!currentUser),
    shareReplay({
      bufferSize: 1,
      refCount: true,
    })
  );

  signup(username: string, password: string): void {
    this.store.dispatch(AuthActions.signup({ username, password }));
  }

  login(username: string, password: string): void {
    this.store.dispatch(AuthActions.login({ username, password }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
