import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  addPushSubscriber(sub: PushSubscription) {
    return this.http.post('/api/subscribe', sub);
  }

  // TODO: implement in backend
  removePushSubscriber(sub: PushSubscription) {
    return this.http.post('/api/unsubscribe', sub);
  }

}
