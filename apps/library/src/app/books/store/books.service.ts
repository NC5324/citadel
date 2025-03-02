import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "./books.feature";

@Injectable({ providedIn: 'root' })
export class BooksService {
    private readonly http = inject(HttpClient);
    private readonly baseApiUrl = 'https://openlibrary.org/search.json?languaguage=eng&mode=everything';

    searchBooks$(query: string): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.baseApiUrl}&q=${query}`);
    }

}