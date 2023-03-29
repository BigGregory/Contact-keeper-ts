import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

import { TypedRequest, UserDB } from '../types';

interface JwtPayload {
  user: UserDB;
}

export const checkJWT = (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get token from header and verify
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied!' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')) as JwtPayload;

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
