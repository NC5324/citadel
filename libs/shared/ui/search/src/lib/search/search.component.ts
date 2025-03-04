import { Component, EventEmitter, input, Input, model, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'lib-search',
  imports: [CommonModule, FormsModule, NgIcon, HlmIconDirective],
  providers: [provideIcons({ lucideSearch })],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  
  value = model<string>('');
  variant = input<'slim' | 'default'>('default');

  @Output()
  search = new EventEmitter<{ query: string }>();

  emitSearch(): void {
    this.search.emit({ query: this.value() });
  }
  
}
