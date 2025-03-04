import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '@citadel/search';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, SearchComponent],
  providers: [provideIcons({ lucideSearch })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly router = inject(Router);
  readonly searchService = inject(SearchService);

  @HostListener('window:keydown.enter')
  handleKeyDown() {
    this.search();
  }

  ngOnInit(): void {
	this.searchService.query = '';
  }

  search(): void {
    this.searchService.search();
    this.router.navigateByUrl('/books');
  }
}
