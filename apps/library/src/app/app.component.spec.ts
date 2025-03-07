import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchService } from './services/search.service';
import { UserActions } from './user/store/user.actions';
import { BooksActions } from './books/store/books.actions';
import { ThemeService } from './services/theme.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;
  let mockRouter: jest.Mocked<Router>;
  let mockSearchService: jest.Mocked<SearchService>;
  let mockThemeService: jest.Mocked<ThemeService>

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;
    mockSearchService = { search: jest.fn() } as unknown as jest.Mocked<SearchService>;
    mockThemeService = { toggleDarkMode: jest.fn() } as unknown as jest.Mocked<ThemeService>;
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: mockRouter },
        { provide: SearchService, useValue: mockSearchService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title Citadel', () => {
    expect(component.title).toEqual('Citadel');
  });

  it('should dispatch search action', () => {
    jest.spyOn(mockStore, 'dispatch');
    mockSearchService.query = 'Mistborn';

    component.search();

    expect(mockStore.dispatch).toHaveBeenCalledWith(BooksActions.search({ query: 'Mistborn' }));
  });

  it('should not dispatch search action on empty query', () => {
    jest.spyOn(mockStore, 'dispatch');
    mockSearchService.query = '';

    component.search();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should navigate to books page on search', () => {
    jest.spyOn(mockRouter, 'navigate');
    mockSearchService.query = 'Mistborn';

    component.search();

    expect(mockRouter.navigate).toHaveBeenCalledWith('/books');
  });

  it('should not navigate to books page on empty query', () => {
    jest.spyOn(mockRouter, 'navigate');
    mockSearchService.query = 'Mistborn';

    component.search();

    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });

  it('should dispatch logout action', () => {
    jest.spyOn(mockStore, 'dispatch');

    component.logout();

    expect(mockStore.dispatch).toHaveBeenCalledWith(UserActions.resetUser());
  });

  it('should navigate home on logout', () => {
    jest.spyOn(mockRouter, 'navigate');

    component.logout();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  })

});
