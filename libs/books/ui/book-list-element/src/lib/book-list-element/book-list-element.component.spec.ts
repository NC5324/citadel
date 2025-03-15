import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListElementComponent } from './book-list-element.component';

describe('BookListElementComponent', () => {
  let component: BookListElementComponent;
  let fixture: ComponentFixture<BookListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
