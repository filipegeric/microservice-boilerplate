export interface IHttpRequest {
  ip: string;
  params: any;
  body: any;
  query: any;
}

export interface IHttpResponse<T = any> {
  status: number;
  headers?: any;
  data: T;
}
