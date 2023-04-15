import { Response } from 'express';

export const sendServerError = (error: any, res: Response) => {
  console.error(error);
  res.status(500).json({ msg: 'Server error' });
};
