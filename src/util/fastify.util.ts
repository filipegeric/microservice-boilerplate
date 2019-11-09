import { FastifyReply, FastifyRequest } from 'fastify';

import { IHttpRequest } from '../types/http';

export function makeFastifyCallback<T extends any>(
  controller: T,
  action: keyof T
) {
  return async (req: FastifyRequest, res: FastifyReply<any>) => {
    try {
      const request: IHttpRequest = {
        body: req.body,
        ip: req.ip,
        params: req.params,
        query: req.query
      };
      const response = await controller[action](request);
      if (response.headers) {
        res.headers(response.headers);
      }
      return response.data;
    } catch (error) {
      res
        .status(error.status || 500)
        .send(error.message || 'Internal server error');
    }
  };
}
