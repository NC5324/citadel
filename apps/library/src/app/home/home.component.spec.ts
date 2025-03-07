import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { SearchService } from '../services/search.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore;
  let mockRouter: jest.Mocked<Router>;
  let mockSearchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    mockRouter = { navigateByUrl: jest.fn() } as unknown as jest.Mocked<Router>;
    mockSearchService = { query: '', search: jest.fn() } as unknown as jest.Mocked<SearchService>;

    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule],
      providers: [
        provideMockStore(),
        provideIcons({ lucideSearch }),
        { provide: Router, useValue: mockRouter },
        { provide: SearchService, useValue: mockSearchService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
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

  it('should call search function with input value when button is clicked', () => {
    jest.spyOn(component, 'search');
    const button = fixture.nativeElement.querySelector('lib-search > button');
    const input = fixture.nativeElement.querySelector('lib-search > input');
    input.value = 'Mistborn';

    input.dispatchEvent(new Event('input'));
    button.click();

    expect(component.search).toHaveBeenCalledWith('Mistborn');
  });

  it('should navigate to books page on search', () => {
    jest.spyOn(mockRouter, 'navigateByUrl');
    mockSearchService.query = 'Brandon Sanderson';

    component.search();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/books');
  });

  it('should dispatch search action on enter', () => {
    jest.spyOn(mockStore, 'dispatch');
    mockSearchService.query = 'Mistborn';

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        bubbles: true,
      })
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith({ query: 'Mistborn' });
  });

  it('should not dispatch search action on empty query', () => {
    jest.spyOn(mockStore, 'dispatch');
    mockSearchService.query = '';

    component.search();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });

});
