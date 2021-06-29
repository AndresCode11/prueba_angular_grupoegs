import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string;
  private registerUrl: string;

  constructor(private http: HttpClient) { 
    this.loginUrl = environment.API_ENDPOINT + '/login';
    this.registerUrl = environment.API_ENDPOINT + '/register'; 
  }

  public setToken(token): void {
    localStorage.setItem('token', token);
  }

  public loginService(formData): Observable<Object> {
    return this.http.post(this.loginUrl, formData, {responseType: 'json'});
  }

  public registerService(formData): Observable<Object> {
    return this.http.post(this.registerUrl, formData, {responseType: 'json'});
  }
}
