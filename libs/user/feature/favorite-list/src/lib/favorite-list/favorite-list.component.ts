import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-favorite-list',
  imports: [CommonModule],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteListComponent {}
