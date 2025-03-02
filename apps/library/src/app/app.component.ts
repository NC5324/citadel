import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBook, lucideMoon, lucideSun } from '@ng-icons/lucide';

@Component({
  imports: [RouterModule, HlmButtonDirective, NgIcon, HlmIconDirective],
  providers: [provideIcons({ lucideBook, lucideSun, lucideMoon })],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = 'Citadel';
  readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
}
