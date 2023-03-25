import { Request } from 'express';

export interface UserType {
  name: string;
  email: string;
  password: string;
  date?: Date;
}

export interface TypedRequest<T> extends Request {
  body: T;
}
