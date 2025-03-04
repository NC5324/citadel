import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '@citadel/search';

@Component({
	selector: 'app-home',
	imports: [CommonModule, FormsModule, SearchComponent],
	providers: [provideIcons({ lucideSearch })],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly router = inject(Router);
	public searchQuery = '';

	@HostListener('window:keydown.enter')
	handleKeyDown() {
	this.search(this.searchQuery);
	}

	search(query: string): void {
		if (query) {
			this.searchQuery = '';
			this.router.navigateByUrl('/books', {
				state: {
					search: query,
				},
			});
		}
	}
}
