import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importa 'tap' desde rxjs/operators
import { AuthResponse } from './models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication'; // URL de inicio de sesión
  private token: string = "";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      Body: {
        Username: username,
        Password: password
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<AuthResponse>(this.baseUrl, body, { headers }).pipe(
      tap((response) => {
        if (response.IsOK && response.Body) {
          this.setToken(response.Body.Token);
        }
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}
