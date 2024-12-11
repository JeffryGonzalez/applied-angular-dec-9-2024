import { http, HttpResponse, delay } from 'msw';
import { Friend } from '../app/meals/types';

const fakeFriends: Friend[] = [
  { id: '1', name: 'Brad', boughtLastTime: true },
  { id: '2', name: 'Jules', boughtLastTime: false },
  { id: '3', name: 'Louie', boughtLastTime: true },
  { id: '4', name: 'Michael', boughtLastTime: false },
];
const handlers = [
  http.get('/api/user/friends', async () => {
    await delay(5000);
    return HttpResponse.json(fakeFriends);
  }),
  http.post('/api/user/friends', async ({ request }) => {
    await delay(2000);
    const body = (await request.json()) as unknown as { name: string };

    const newFriend: Friend = {
      id: crypto.randomUUID(),
      name: body.name,
      boughtLastTime: false,
    };
    return HttpResponse.json(newFriend);
  }),
];

export default handlers;
