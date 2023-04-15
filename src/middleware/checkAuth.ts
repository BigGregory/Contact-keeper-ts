import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';

import { TypedRequest, UserDB, ContactBase } from '../types';

interface JwtPayloadExtended extends JwtPayload {
  user: UserDB;
}

export const checkAuth = (
  req: TypedRequest<any>, // hardcoded generic to "any" because of further type manipulation
  res: Response,
  next: NextFunction
) => {
  // Get token from header and verify
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied!' });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get('jwtSecret')
    ) as JwtPayloadExtended;

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
