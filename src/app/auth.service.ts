import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseSignUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  baseSignInUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  apiKey = 'AIzaSyD1O6sO7uFrwlns1gR1PGfAibtNu_uyHoA';
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return (
      this.http
        .post<AuthResponseData>(`${this.baseSignUpUrl}${this.apiKey}`, {
          email: email,
          password: password,
          returnSecureToken: true,
        })
        // FALTA METERLE EL ERROR HANDLER!!!
        .pipe(
          tap((resData) => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        )
    );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.baseSignInUrl}${this.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
