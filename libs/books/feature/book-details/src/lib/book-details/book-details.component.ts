import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {}
