import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { Book } from 'apps/library/src/app/books/store/books.feature';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept books input', () => {
      const mockBooks = [{ id: '1' } as unknown as Book];
      fixture.componentRef.setInput('books', mockBooks);
      expect(component.books()).toEqual(mockBooks);
    });

    it('should accept favoriteIds input', () => {
      const mockFavorites = ['1', '2'];
      fixture.componentRef.setInput('favoriteIds', mockFavorites);
      expect(component.favoriteIds()).toEqual(mockFavorites);
    });
  });

  describe('bookTags', () => {
    const testCases = [
      {
        description: 'with valid subjects',
        input: ['Fiction', 'Science', 'History', 'Math', 'Physics', 'Chemistry'],
        expected: ['Fiction', 'Science', 'History', 'Math', 'Physics', '+1 more']
      },
      {
        description: 'with invalid subjects',
        input: ['123', '456', '789', '101112'],
        expected: ['123', '456', '+2 more']
      },
      {
        description: 'with mixed subjects',
        input: ['Valid', '123', 'AnotherValid', '456'],
        expected: ['Valid', 'AnotherValid', '+2 more']
      },
      {
        description: 'with empty subjects',
        input: [],
        expected: []
      }
    ];

    testCases.forEach(({ description, input, expected }) => {
      it(`should handle ${description}`, () => {
        const book = { subject: input } as unknown as Book;
        expect(component.bookTags(book)).toEqual(expected);
      });
    });
  });

  describe('isFavorite()', () => {
    it('should return true when book is in favorites', () => {
      fixture.componentRef.setInput('favoriteIds', ['1', '2']);
      expect(component.isFavorite('1', component.favoriteIds())).toBe(true);
    });

    it('should return false when book is not in favorites', () => {
      fixture.componentRef.setInput('favoriteIds', ['1', '2']);
      expect(component.isFavorite('3', component.favoriteIds())).toBe(false);
    });

    it('should return false when favorites is undefined', () => {
      fixture.componentRef.setInput('favoriteIds', undefined);
      expect(component.isFavorite('1', component.favoriteIds())).toBe(false);
    });
  });

  const mockBook = { id: '1' } as unknown as Book;

  it('should emit addFavorite event', () => {
    const emitSpy = jest.spyOn(component.addFavorite, 'emit');
    component.onAddFavorite(mockBook);
    expect(emitSpy).toHaveBeenCalledWith({ book: mockBook });
  });

  it('should emit removeFavorite event', () => {
    const emitSpy = jest.spyOn(component.removeFavorite, 'emit');
    component.onRemoveFavorite(mockBook);
    expect(emitSpy).toHaveBeenCalledWith({ book: mockBook });
  });

  it('should display correct number of books', () => {
    const mockBooks = [
      { id: '1', subject: ['Fiction'] } as unknown as Book,
      { id: '2', subject: ['Science'] } as unknown as Book
    ];
    
    fixture.componentRef.setInput('books', mockBooks);
    fixture.detectChanges();
    
    const items = fixture.nativeElement.querySelectorAll('[data-test="book-item"]');
    expect(items.length).toBe(2);
  });
});
