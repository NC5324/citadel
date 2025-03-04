import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.feature";

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly http = inject(HttpClient);

    loadCurrentUser$(): Observable<User> {
        return this.http.get<User>(`user`);
    }

    addFavorite$(userId: number, bookId: string): Observable<string[]> {
        return this.http.post<string[]>(`/api/user/${userId}/favorites/add`, { bookId });
    }

    removeFavorite$(userId: number, bookId: string): Observable<string[]> {
        return this.http.post<string[]>(`/api/user/${userId}/favorites/remove`, { bookId });
    }

}