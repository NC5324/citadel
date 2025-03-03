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
  private readonly apiUrl = 'https://openlibrary.org/search.json';

  searchBooks$(
    query: string,
    page: number,
    pageSize: number
  ): Observable<OpenLibrarySearchResponse> {
    return this.http
      .get<OpenLibrarySearchResponse>(this.apiUrl, {
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
}
