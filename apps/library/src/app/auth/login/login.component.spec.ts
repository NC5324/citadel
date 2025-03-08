import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthActions } from '../store/auth.actions';
import { Location } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let mockRouter: jest.Mocked<Router>;
  let mockLocation: jest.Mocked<Location>;

  beforeEach(async () => {
    mockRouter = { navigateByUrl: jest.fn() } as unknown as jest.Mocked<Router>;
    mockLocation = { getState: jest.fn() } as unknown as jest.Mocked<Location>;

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({ username: null, password: null });
  });

  it('should navigate to signup with returnUrl from location state', () => {
    mockLocation.getState.mockReturnValue({ returnUrl: '/' });
    
    component.navigateToSignup();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/signup', { state: { returnUrl: '/' } });
  });

  it('should dispatch login action and navigate to returnUrl', () => {
    component.form.setValue({ username: 'testuser', password: 'password123' });
    mockLocation.getState.mockReturnValue({ returnUrl: '/user/favorites' });

    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.login({ username: 'testuser', password: 'password123' }));
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/favorites', { state: { returnUrl: undefined } });
  });

  it('should navigate to root when returnUrl is not provided', () => {
    component.form.setValue({ username: 'testuser', password: 'password123' });
    mockLocation.getState.mockReturnValue({});

    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.login({ username: 'testuser', password: 'password123' }));
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/', { state: { returnUrl: undefined } });
  });
});
