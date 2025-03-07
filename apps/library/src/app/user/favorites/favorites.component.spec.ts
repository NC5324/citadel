import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { inject } from '@angular/core';
import { Book } from '../../books/store/books.feature';
import { UserActions } from '../store/user.actions';
import { BooksActions } from '../../books/store/books.actions';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();

    mockStore = inject(MockStore);
    fixture = TestBed.createComponent(FavoritesComponent);
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

  it('should dispatch search action', () => {
    jest.spyOn(mockStore, 'dispatch');

    component.search('Mistborn');

    expect(mockStore.dispatch).toHaveBeenCalledWith(BooksActions.search({ query: 'Mistborn' }));
  });

  it('should not dispatch search action on empty query', () => {
    jest.spyOn(mockStore, 'dispatch');

    component.search('');

    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });

});
