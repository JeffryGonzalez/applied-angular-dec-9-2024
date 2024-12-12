import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Friend } from '../types';
import { map, tap } from 'rxjs';
import z from 'zod';

const NameSchema = z.string().nonempty().min(3).max(102);
const FriendSchema = z.object({
  id: z.string(),
  name: NameSchema,
  boughtLastTime: z.boolean(),
});

export class FriendsDataService {
  #httpClient = inject(HttpClient);
  getFriends() {
    return this.#httpClient.get<Friend[]>('/api/user/friends');
  }

  addFriend(name: string, tempId: string) {
    return this.#httpClient
      .post<Friend>('/api/user/friends', { name }) // longer than 16.667 ms
      .pipe(
        map((friend) => FriendSchema.parse(friend)),
        // tap(demo => demo.), // Friend => Friend (inferred FriendSchema instance)
        map((friend) => ({ friend, tempId })),
      ); // { { id: "92929", } "x1"}
  }
  markFriendAsOwingYou(friend: Friend) {
    return this.#httpClient.post<Friend>(
      '/api/user/friends-that-owe-you-lunch/',
      friend,
    );
  }
  markFriendAsYouOwingThem(friend: Friend) {
    return this.#httpClient.post<Friend>(
      '/api/user/friends-that-you-owe-lunch/',
      friend,
    );
  }
}
