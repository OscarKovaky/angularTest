import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private baseUrl = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole';

  constructor(private http: HttpClient) { }

  registerUser(token: string, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.baseUrl, { Body: userData }, { headers });
  }
}
