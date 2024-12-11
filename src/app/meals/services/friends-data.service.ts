import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Friend } from '../types';
import { map } from 'rxjs';

export class FriendsDataService {
  #httpClient = inject(HttpClient);
  getFriends() {
    return this.#httpClient.get<Friend[]>('/api/user/friends');
  }

  addFriend(name: string, tempId: string) {
    return this.#httpClient
      .post<Friend>('/api/user/friends', { name })
      .pipe(map((r) => ({ r, tempId })));
  }
}
