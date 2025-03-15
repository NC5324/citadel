import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBook,
  lucideHeart,
  lucideLogIn,
  lucideLogOut,
  lucideMoon,
  lucideSun,
} from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SearchComponent } from '@citadel/search';
import { SearchService } from './services/search.service';
import { AuthFacade } from '@citadel/auth/data-access';

@Component({
  imports: [
    RouterModule,
    AsyncPipe,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    SearchComponent,
  ],
  providers: [
    provideIcons({
      lucideBook,
      lucideHeart,
      lucideSun,
      lucideMoon,
      lucideLogOut,
      lucideLogIn,
    }),
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = 'Citadel';

  readonly router = inject(Router);
  readonly themeService = inject(ThemeService);
  readonly searchService = inject(SearchService);
  private readonly authFacade = inject(AuthFacade);

  readonly authenticated$ = this.authFacade.authenticated$;

  search(): void {
    this.searchService.search();
    if (this.searchService.query && this.router.url !== '/books') {
      this.router.navigateByUrl('/books');
    }
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  logout(): void {
    this.authFacade.logout();
  }
}
