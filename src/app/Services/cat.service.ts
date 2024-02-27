import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient) {}

  private backendUrl = 'http://localhost:3001/api'

  getCatData () {
    return this.http.get(`${this.backendUrl}/cats/cat/data`, {withCredentials: true});
  }

}
