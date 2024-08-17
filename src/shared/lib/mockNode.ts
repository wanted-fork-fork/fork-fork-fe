import { setupServer } from 'msw/node';
import { getGoogooApiMock } from 'src/types';

export const server = setupServer(...getGoogooApiMock());
