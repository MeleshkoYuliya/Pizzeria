import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;
  private isAdmin = false;

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/signup', user);
  }

  login(user: User): Observable<{token: string, user: User}> {
    return this.http.post<{token: string, user: User}>('/api/login', user)
      .pipe(
        tap(
          ({token, user}) => {
            localStorage.setItem('auth-token', token);
            localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));
            this.setToken(token);
          }
        )
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {   
    this.token = localStorage.getItem('auth-token'); 
    return !!this.token;
  }

  isAurheticatedAdmin(): boolean {   
    this.isAdmin = localStorage.getItem('isAdmin') ? JSON.parse(localStorage.getItem('isAdmin')) : false; 
    return this.isAdmin && this.isAuthenticated();
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('auth-token');
  }
}
