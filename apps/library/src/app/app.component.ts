import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBook, lucideHeart, lucideLogOut, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { userFeature } from './user/store/user.feature';
import { map } from 'rxjs';
import { AuthActions } from './auth/store/auth.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [RouterModule, HlmButtonDirective, NgIcon, HlmIconDirective, AsyncPipe],
  providers: [provideIcons({ lucideBook, lucideHeart, lucideSun, lucideMoon, lucideLogOut })],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = 'Citadel';

  readonly store = inject(Store);
  readonly router = inject(Router);
  readonly themeService = inject(ThemeService);

  readonly authenticated$ = this.store.select(userFeature.selectUser).pipe(
    map((user) => !!user),
  );

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }
  
}
