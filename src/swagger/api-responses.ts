import { GlobalErrorSwagger } from './global-errors-swagger';

export const status404 = {
  status: 404,
  description: 'not found',
  type: GlobalErrorSwagger,
};

export const status401 = {
  status: 401,
  description: 'unauthorized',
  type: GlobalErrorSwagger,
};

export const status403 = {
  status: 403,
  description: 'bad request',
  type: GlobalErrorSwagger,
};

export const status204 = {
  status: 204,
  description: 'no content',
};
