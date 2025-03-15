import { ChangeDetectionStrategy, Component, input, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideHeartCrack, lucideEye } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardDescriptionDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'lib-book-list-element',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardDescriptionDirective,
    HlmCardFooterDirective,
    HlmBadgeDirective,
  ],
  providers: [provideIcons({ lucideHeart, lucideHeartCrack, lucideEye })],
  templateUrl: './book-list-element.component.html',
  styleUrl: './book-list-element.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListElementComponent {

  @Input()
  title?: string;

  @Input()
  publishYear?: number;

  @Input()
  authorLabel?: string;

  @Input()
  coverId?: string;

  @Input()
  tags: string[] = [];

  @Input()
  actionsTemplate?: TemplateRef<unknown>;

}
