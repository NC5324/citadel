import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Book } from '../../books/store/books.feature';
import { UserActions } from '../store/user.actions';
import { BooksActions } from '../../books/store/books.actions';
import { ActivatedRoute } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jest.SpyInstance;
  let activatedRoute: jest.Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = {} as unknown as jest.Mocked<ActivatedRoute>;
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(FavoritesComponent);
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

  it('should dispatch search action', () => {
    component.search('Mistborn');

    expect(dispatchSpy).toHaveBeenCalledWith(BooksActions.search({ query: 'Mistborn' }));
  });

  it('should not dispatch search action on empty query', () => {
    component.search('');

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

});
