import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardFooterDirective } from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { AuthFacade } from '@citadel/auth/data-access';

@Component({
  selector: 'lib-login',
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
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly authFacade = inject(AuthFacade);

  readonly form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  navigateToSignup(): void {
    const { returnUrl } = this.location.getState() as { returnUrl?: string };
    this.router.navigateByUrl('/auth/signup', {
      state: {
        returnUrl,
      },
    });
  }

  login(): void {
    const { username, password } = this.form.value;
    const { returnUrl } = this.location.getState() as { returnUrl?: string };
    this.authFacade.login(username as string, password as string);
    this.router.navigateByUrl(returnUrl ?? '/', {
      state: {
        returnUrl: undefined,
      },
    });
  }
  
}
