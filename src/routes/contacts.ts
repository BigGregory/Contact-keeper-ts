import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';

import { checkAuth } from '../middleware';
import User from '../models/User';
import Contact from '../models/Contact';
import { TypedRequest, ContactBase } from '../types';

const router = express.Router();

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', checkAuth, async (req: TypedRequest, res: Response) => {
  try {
    const contacts =
      req.user &&
      (await Contact.find({ user: req.user.id }).sort({ date: -1 }));
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  checkAuth,
  [check('name', 'Name is required').not().isEmpty()],
  async (req: TypedRequest<ContactBase>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact<ContactBase>({
        name,
        email,
        phone,
        type,
        user: req.user?.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
