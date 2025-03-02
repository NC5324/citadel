import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user/store/user.feature';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly http = inject(HttpClient);

	signup$(username: string, password: string): Observable<User> {
		return this.http.post<User>(`auth/signup`, { username, password });
	}

	login$(username: string, password: string): Observable<User> {
		return this.http.post<User>(`auth/login`, { username, password });
	}

	logout$(): Observable<void> {
		return this.http.get<void>(`auth/logout`);
	}
}
