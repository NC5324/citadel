import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  inject,
  PLATFORM_ID,
  RendererFactory2,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(
    null,
    null
  );

  readonly theme = signal<'light' | 'dark'>('dark');

  constructor() {
    this.syncThemeFromLocalStorage();
    this.toggleClassOnThemeChanges();
  }

  private syncThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.theme.set(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
      );
    }
  }

  private toggleClassOnThemeChanges(): void {
    toObservable(this.theme)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => {
        if (theme === 'dark') {
          this.renderer.addClass(this.document.documentElement, 'dark');
        } else {
          if (this.document.documentElement.className.includes('dark')) {
            this.renderer.removeClass(this.document.documentElement, 'dark');
          }
        }
      });
  }

  toggleDarkMode(): void {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    this.theme.set(newTheme);
  }
}
