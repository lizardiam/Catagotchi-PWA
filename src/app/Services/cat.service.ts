import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient) {}

  private backendUrl = 'http://localhost:3001/api'

  getCatData () {
    return this.http.get(`${this.backendUrl}/cat/data`, {withCredentials: true});
  }

  feedCat() {
    return this.http.get(`${this.backendUrl}/cat/feed`, {withCredentials: true});
  }

  waterCat () {
    return this.http.get(`${this.backendUrl}/cat/water`, {withCredentials: true});
  }

  petCat () {
    return this.http.get(`${this.backendUrl}/cat/pet`, {withCredentials: true});
  }


}
