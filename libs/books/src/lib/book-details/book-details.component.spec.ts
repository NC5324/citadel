import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from './book-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'apps/library/src/app/books/store/books.service';
import { Book } from 'apps/library/src/app/books/store/books.feature';
import { UserActions } from 'apps/library/src/app/user/store/user.actions';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let mockRoute: jest.Mocked<ActivatedRoute>;
  let mockBooksService: jest.Mocked<BooksService>;

  beforeEach(async () => {
    mockRoute = { } as unknown as jest.Mocked<ActivatedRoute>;
    mockBooksService = { } as unknown as jest.Mocked<BooksService>;

    await TestBed.configureTestingModule({
      imports: [BookDetailsComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: BooksService, useValue: mockBooksService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(BookDetailsComponent);
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

});
