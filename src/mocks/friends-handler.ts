import { http, HttpResponse } from 'msw';
import { Friend } from '../app/meals/types';

const fakeFriends: Friend[] = [
  { id: '1', name: 'Brad', boughtLastTime: true },
  { id: '2', name: 'Jules', boughtLastTime: false },
  { id: '3', name: 'Louie', boughtLastTime: true },
  { id: '4', name: 'Michael', boughtLastTime: false },
];
const handlers = [
  http.get('/api/user/friends', () => {
    return HttpResponse.json(fakeFriends);
  }),
];

export default handlers;
