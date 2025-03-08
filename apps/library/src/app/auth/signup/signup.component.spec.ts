import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthActions } from '../store/auth.actions';
import { SearchService } from '../../services/search.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let mockRouter: jest.Mocked<Router>;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;
  let mockLocation: jest.Mocked<Location>;

  beforeEach(async () => {
    mockRouter = { navigateByUrl: jest.fn() } as unknown as jest.Mocked<Router>;
    mockActivatedRoute = {} as unknown as jest.Mocked<ActivatedRoute>;
    mockLocation = { getState: jest.fn().mockReturnValue({}) } as unknown as jest.Mocked<Location>;

    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        SearchService,
        provideMockStore(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.form.get('username')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
    expect(component.form.get('confirmPassword')).toBeTruthy();
  });

  it('should have required validator for username', () => {
    const username = component.form.get('username');
    username?.setValue('');
    expect(username?.hasError('required')).toBe(true);
  });

  it('should have required validator for password', () => {
    const password = component.form.get('password');
    password?.setValue('');
    expect(password?.hasError('required')).toBe(true);
  });

  it('should validate password match', () => {
    const password = component.form.get('password');
    const confirmPassword = component.form.get('confirmPassword');

    password?.setValue('password');
    confirmPassword?.setValue('confirmPassword');

    expect(confirmPassword?.hasError('notEqual')).toBe(true);

    confirmPassword?.setValue('password');

    expect(confirmPassword?.errors).toBe(null);
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('button[hlmBtn]:first-child');

    component.form.setValue({
      username: '',
      password: '',
      confirmPassword: '',
    });
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    const submitButton = fixture.nativeElement.querySelector('button[hlmBtn]:first-child');

    component.form.setValue({
      username: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });
    fixture.detectChanges();
    
    expect(submitButton.disabled).toBe(false);
  });

  it('should dispatch signup action and navigate on submit', () => {
    mockLocation.getState.mockReturnValue({ returnUrl: '/' });

    component.form.setValue({
      username: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });
    component.signup();

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.signup({ username: 'testuser', password: 'password' }));
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/', { state: { returnUrl: undefined } });
  });

});
