import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private baseUrl = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers'; // URL de la API

  constructor(private http: HttpClient) { }

  getUsers(searchText: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` // Agrega el token de autorización
    });

    const body = {
      Body: {
        SearchText: searchText
      }
    };

    return this.http.post(this.baseUrl, body, { headers });
  }

}
