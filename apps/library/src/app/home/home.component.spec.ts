import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { SearchService } from '../services/search.service';
import { BooksActions } from '../books/store/books.actions';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore;
  let mockRouter: jest.Mocked<Router>;
  let dispatchSpy: jest.SpyInstance;
  let searchService: SearchService;

  beforeEach(async () => {
    mockRouter = { navigateByUrl: jest.fn() } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule],
      providers: [
        SearchService,
        provideMockStore(),
        provideIcons({ lucideSearch }),
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    searchService = TestBed.inject(SearchService);
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

  it('should navigate to books page on search', () => {
    searchService.query = 'Brandon Sanderson';

    component.search();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/books');
  });

  it('should dispatch search action on enter', () => {
    searchService.query = 'Mistborn';

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        bubbles: true,
      })
    );

    expect(dispatchSpy).toHaveBeenCalledWith(BooksActions.search({ query: 'Mistborn' }));
  });

  it('should not dispatch search action on empty query', () => {
    searchService.query = '';

    component.search();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

});
