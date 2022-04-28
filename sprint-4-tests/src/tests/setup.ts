import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './apiMock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
