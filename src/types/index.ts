import { Request } from 'express';

export interface UserBase {
  name: string;
  email: string;
  password: string;
  date?: Date;
}
export interface UserDB extends UserBase {
  id: string;
}

// TODO: user prop inserted directly. Didn't find the way to do it more generic

export interface TypedRequest<T = void> extends Request {
  body: T;
  user?: UserDB;
}
