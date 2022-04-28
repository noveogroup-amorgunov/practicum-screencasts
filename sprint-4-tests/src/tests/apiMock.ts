import { setupServer } from 'msw/node';
import { rest } from 'msw'

const handlers = [
  rest.post('https://ya-praktikum.tech/api/v2/auth/logout', (req, res, ctx) => {
    console.log('Call logout endpoind');

    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
