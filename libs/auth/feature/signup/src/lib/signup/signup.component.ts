import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardFooterDirective } from '@spartan-ng/ui-card-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { AuthFacade } from '@citadel/auth/data-access';

@Component({
  selector: 'lib-signup',
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
    HlmFormFieldModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly authFacade = inject(AuthFacade);

  readonly form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
    confirmPassword: new FormControl<string | null>(null, [Validators.required, this.equalsValidator('password')]),
  });

  signup(): void {
    const { username, password } = this.form.value;
    const { returnUrl } = this.location.getState() as { returnUrl?: string };
    this.authFacade.signup(username as string, password as string);
    this.router.navigateByUrl(returnUrl ?? '/', {
      state: {
        returnUrl: undefined,
      },
    });
  }

  equalsValidator(controlToCompareName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlToCompare = control.parent?.get(controlToCompareName);
      if (controlToCompare?.value !== control.value) {
        return {
          notEqual: true
        };
      }
      return null;
    };
  }

}
