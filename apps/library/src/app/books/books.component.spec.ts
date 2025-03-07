import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchService } from '../services/search.service';
import { Book } from './store/books.feature';
import { UserActions } from '../user/store/user.actions';
import { BooksActions } from './store/books.actions';

class MockSearchService {
  query = '';
}

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockStore: MockStore;
  let mockSearchService: MockSearchService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        { provide: SearchService, useValue: MockSearchService },
        provideMockStore(),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSearchService = TestBed.inject(MockSearchService);
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch add favorite action', () => {
    jest.spyOn(mockStore, 'dispatch');
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

    expect(mockStore.dispatch).toHaveBeenCalledWith(UserActions.addFavorite({ book: mockBook }));
  });

  it('should dispatch remove favorite action', () => {
    jest.spyOn(mockStore, 'dispatch');
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

    expect(mockStore.dispatch).toHaveBeenCalledWith(UserActions.removeFavorite({ book: mockBook }));
  });

  it('should dispatch show more action with search service query', () => {
    jest.spyOn(mockStore, 'dispatch');
    const mockQuery = 'The Stormlight Archive';
    mockSearchService.query = mockQuery;

    component.showMore();

    expect(mockStore.dispatch).toHaveBeenCalledWith(BooksActions.showMore({ query: mockQuery }));
  });

});
