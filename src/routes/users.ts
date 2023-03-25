import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { TypedRequest, UserType } from '../types';

const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add your name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req: TypedRequest<UserType>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
