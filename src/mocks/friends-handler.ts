import { http, HttpResponse, delay } from 'msw';
import { Friend } from '../app/meals/types';

const fakeFriends: Friend[] = [
  { id: '1', name: 'Brad', boughtLastTime: true },
  { id: '2', name: 'Jules', boughtLastTime: false },
];
const handlers = [
  http.post('/api/user/friends-that-owe-you-lunch/', async ({ request }) => {
    await delay();
    const body = (await request.json()) as unknown as Friend;
    body.boughtLastTime = false;
    return HttpResponse.json(body);
  }),
  http.post('/api/user/friends-that-you-owe-lunch/', async ({ request }) => {
    await delay();
    const body = (await request.json()) as unknown as Friend;
    body.boughtLastTime = true;
    return HttpResponse.json(body);
  }),
  http.get('/api/user/friends', async () => {
    await delay();
    return HttpResponse.json(fakeFriends);
  }),

  // when you add a friend...
  http.post('/api/user/friends', async ({ request }) => {
    await delay(5000);
    const body = (await request.json()) as unknown as { name: string };

    const newFriend: Friend & {
      email: string;
      age: number;
      history: string[];
    } = {
      id: crypto.randomUUID(),
      name: body.name,
      boughtLastTime: false,
      email: body.name + '@company.com',
      age: 42,
      history: [
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
        'big long thing',
      ],
    };
    return HttpResponse.json(newFriend);
  }),
];

export default handlers;
