import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./models/user.interface";

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly http = inject(HttpClient);

    loadCurrentUser$(): Observable<User> {
        return this.http.get<User>(`/api/current-user`);
    }

    addFavorite$(userId: number, bookId: string): Observable<string[]> {
        return this.http.post<string[]>(`/api/user/${userId}/favorites/add`, { bookId });
    }

    removeFavorite$(userId: number, bookId: string): Observable<string[]> {
        return this.http.post<string[]>(`/api/user/${userId}/favorites/remove`, { bookId });
    }

}