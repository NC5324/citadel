import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchService } from '../services/search.service';
import { Book } from './store/books.feature';
import { UserActions } from '../user/store/user.actions';
import { BooksActions } from './store/books.actions';
import { ActivatedRoute } from '@angular/router';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;
  let searchService: SearchService;

  beforeEach(async () => {
    mockActivatedRoute = {} as unknown as jest.Mocked<ActivatedRoute>;

    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        SearchService,
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch add favorite action', () => {
    const mockBook: Book = {
      key: '',
      title: '',
      author_name: [],
      description: '',
      first_publish_year: 0,
      cover_i: '',
      covers: [],
      subject: [],
      subjects: [],
    };

    component.addFavorite(mockBook);

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.addFavorite({ book: mockBook }));
  });

  it('should dispatch remove favorite action', () => {
    const mockBook: Book = {
      key: '',
      title: '',
      author_name: [],
      description: '',
      first_publish_year: 0,
      cover_i: '',
      covers: [],
      subject: [],
      subjects: [],
    };
    
    component.removeFavorite(mockBook);

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.removeFavorite({ book: mockBook }));
  });

  it('should dispatch show more action with search service query', () => {
    const mockQuery = 'The Stormlight Archive';
    searchService.query = mockQuery;

    component.showMore();

    expect(dispatchSpy).toHaveBeenCalledWith(BooksActions.showMore({ query: mockQuery }));
  });

});
