import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';

import { checkAuth } from '../middleware';
import { sendServerError } from '../utils';
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
    sendServerError(error, res);
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
      sendServerError(error, res);
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put(
  '/:id',
  checkAuth,
  async (req: TypedRequest<ContactBase>, res: Response) => {
    const { name, email, phone, type } = req.body;

    const contactFields = {} as ContactBase;
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      if (req.user?.id !== contact.user?.toString()) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          $set: contactFields,
        },
        { new: true }
      );
      res.status(201).json(contact);
    } catch (error) {
      sendServerError(error, res);
    }
  }
);

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete(
  '/:id',
  checkAuth,
  async (req: TypedRequest<ContactBase>, res: Response) => {
    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      // Check if user owns contact
      if (req.user?.id !== contact.user?.toString()) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      await Contact.findByIdAndRemove(req.params.id);
      res.status(200).json({ msg: 'Contact removed' });
    } catch (error) {
      sendServerError(error, res);
    }
  }
);

module.exports = router;
