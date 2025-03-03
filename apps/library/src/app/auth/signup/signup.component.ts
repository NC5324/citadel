import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardFooterDirective } from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';

@Component({
  selector: 'app-signup',
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
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, [Validators.required, this.equalsValidator('confirmPassword')]),
    confirmPassword: new FormControl<string | null>(null, [Validators.required, this.equalsValidator('password')]),
  });

  signup(): void {
    const { username, password } = this.form.value;
    const { returnUrl } = this.location.getState() as { returnUrl?: string };
    this.store.dispatch(AuthActions.signup({ username: username as string, password: password as string }));
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
