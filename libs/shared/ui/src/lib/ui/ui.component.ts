import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui',
  imports: [CommonModule],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponent {}
