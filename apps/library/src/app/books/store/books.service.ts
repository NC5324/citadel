import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from './books.feature';

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);

  searchBooks$(
    query: string,
    page: number,
    pageSize: number
  ): Observable<OpenLibrarySearchResponse> {
    return this.http
      .get<OpenLibrarySearchResponse>('https://openlibrary.org/search.json', {
        params: {
          mode: 'everything',
          language: 'eng',
          fields: 'key,title,author_name,first_publish_year,cover_i,subject',
          limit: pageSize,
          q: query,
          page,
        },
      });
  }

  loadBook$(id: string): Observable<Book> {
    return this.http.get<Book>(`https://openlibrary.org/works/${id}.json`)
  }

}
