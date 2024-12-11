import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Friend } from '../types';

export class FriendsDataService {
  #httpClient = inject(HttpClient);
  getFriends() {
    return this.#httpClient.get<Friend[]>('/api/user/friends');
  }

  addFriend(name: string) {
    return this.#httpClient.post<Friend>('/api/user/friends', { name });
  }
}
