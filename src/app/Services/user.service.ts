import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root' // -> service can be used in entire application (Service is created by root application injector)
})

export class UserService {
  private backendUrl = 'http://localhost:3001/api'

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string, name: string) {
    return this.http.put(`${this.backendUrl}/users/register`, {username, password, email, name});
  }

  login(username: string, password: string) {
    return this.http.post(`${this.backendUrl}/users/login`, {username, password}, {withCredentials: true});
  }

  logout() {
    return this.http.delete(`${this.backendUrl}/users/logout`);
  }

  delete() {
    return this.http.delete(`${this.backendUrl}/users/user`, {withCredentials: true});
  }

}
