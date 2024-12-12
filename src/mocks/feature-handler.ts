import { http, HttpResponse } from 'msw';

const features = ['meals', 'home-meal-summary'];
const handlers = [
  http.get('http://no-exisitent-but-server/api/features', () => {
    return HttpResponse.json(features);
  }),
];

export default handlers;
