import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
} from '@spartan-ng/ui-card-helm';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardFooterDirective,
    HlmInputDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  login(): void {
    const { username, password } = this.form.value;
    const { returnUrl } = this.location.getState() as { returnUrl?: string };
    this.store.dispatch(AuthActions.login({ username: username as string, password: password as string }));
    this.router.navigateByUrl(returnUrl ?? '/', {
      state: {
        returnUrl: undefined,
      },
    });
  }
  
}
