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
import { userFeature } from './user/store/user.feature';
import { filter, map } from 'rxjs';
import { AsyncPipe, Location } from '@angular/common';
import { UserActions } from './user/store/user.actions';
import { SearchComponent } from '@citadel/search';
import { BooksActions } from './books/store/books.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class AppComponent implements OnInit {
  readonly title = 'Citadel';

  readonly store = inject(Store);
  readonly router = inject(Router);
  readonly location = inject(Location);
  readonly themeService = inject(ThemeService);
  readonly destroyRef = inject(DestroyRef);

  readonly authenticated$ = this.store
    .select(userFeature.selectUser)
    .pipe(map((user) => !!user));

  public searchQuery = '';

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      const { search } = this.location.getState() as { search?: string };
      this.searchQuery = search ?? '';
      this.search();
    });
  }

  search(): void {
    if (!this.searchQuery) {
      return;
    }
    if (this.router.url === '/books') {
      this.store.dispatch(BooksActions.search({ query: this.searchQuery }));
    } else {
      this.router.navigateByUrl('/books', {
        state: {
          search: this.searchQuery,
        },
      });
    }
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  logout(): void {
    this.store.dispatch(UserActions.resetUser());
    this.router.navigate(['/']);
  }
}
