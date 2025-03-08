import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchService } from './services/search.service';
import { UserActions } from './user/store/user.actions';
import { BooksActions } from './books/store/books.actions';
import { ThemeService } from './services/theme.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let searchService: SearchService;
  let mockStore: MockStore;
  let mockRouter: jest.Mocked<Router>;
  let mockRoute: jest.Mocked<ActivatedRoute>;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    mockRouter = { url: '/', navigate: jest.fn(), navigateByUrl: jest.fn() } as unknown as jest.Mocked<Router>;
    mockRoute = { } as unknown as jest.Mocked<ActivatedRoute>;
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ThemeService,
        SearchService,
        provideMockStore(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    searchService = TestBed.inject(SearchService);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
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

  it('should dispatch search action and navigate to books page', () => {
    searchService.query = 'Mistborn';

    component.search();

    expect(dispatchSpy).toHaveBeenCalledWith(BooksActions.search({ query: 'Mistborn' }));
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/books');
  });

  it('should not dispatch search action on empty query', () => {
    searchService.query = '';

    component.search();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });

  it('should dispatch logout action and navigate home', () => {
    component.logout();

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.resetUser());
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

});
