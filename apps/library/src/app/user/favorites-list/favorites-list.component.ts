import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {}
