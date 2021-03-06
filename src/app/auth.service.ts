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

interface UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
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
  private tokenExpirationTimer: any;

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

  autologin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      // expirationDuration es igual a la fecha de caducidad del token - el tiempo actual. El resultado
      // es el tiempo restante que queda hasta que caduque el token.
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autologout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  autologout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autologout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
