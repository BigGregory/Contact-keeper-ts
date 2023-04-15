import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { checkAuth } from '../middleware';
import { sendServerError } from '../utils';
import User from '../models/User';
import { TypedRequest, UserBase } from '../types';

const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', checkAuth, async (req: TypedRequest, res: Response) => {
  try {
    const user =
      req.user && (await User.findById(req.user.id).select('-password'));

    res.json(user);
  } catch (error) {
    sendServerError(error, res);
  }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req: TypedRequest<UserBase>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      sendServerError(error, res);
    }
  }
);

module.exports = router;
