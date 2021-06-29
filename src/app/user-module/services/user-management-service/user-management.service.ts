import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private allUsersUrl: string;
  private editUserUrl: string;
  private userDataUrl: string;

  constructor(private http: HttpClient) { 
    this.allUsersUrl = environment.API_ENDPOINT + '/all-users';
    this.editUserUrl = environment.API_ENDPOINT + '/edit-user'; 
    this.userDataUrl = environment.API_ENDPOINT + '/user-data';
  }

  public userDataService(formData): Observable<Object> {
    return this.http.post(this.userDataUrl, formData, {responseType: 'json'});
  }

  public allUsersService(): Observable<Object> {
    return this.http.get(this.allUsersUrl, {responseType: 'json'});
  }

  public editUserService(formData): Observable<Object> {
    return this.http.post(this.editUserUrl, formData, {responseType: 'json'});
  }
}
