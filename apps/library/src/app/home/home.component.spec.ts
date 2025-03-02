import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter, Router } from '@angular/router';
import { appRoutes } from '../app.routes';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule],
      providers: [
        provideMockStore(),
        provideRouter(appRoutes),
        provideIcons({ lucideSearch }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Citadel');
  });

  it('should render sub title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'A Library Of Ice And Fire'
    );
  });

  it('should call search function with input value when button is clicked', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Stormlight';
    input.dispatchEvent(new Event('input'));

    const button = fixture.nativeElement.querySelector('button');
    jest.spyOn(component, 'search');
    button.click();

    expect(component.search).toHaveBeenCalledWith('Stormlight');
  });

  it('search function should dispatch action and navigate', () => {
    const testQuery = 'Wheel of Time';
    component.search(testQuery);

    expect(store.dispatch).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith('/books');
  });

  it('should clear search query after search', () => {
    component.searchQuery = 'Test Query';
    component.search(component.searchQuery);
    expect(component.searchQuery).toBe('');
  });
});
