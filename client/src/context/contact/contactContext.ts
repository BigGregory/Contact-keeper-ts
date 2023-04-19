import { createContext } from 'react';

import { ContactState } from './ContactState';
import { Contact } from '../../types';

const ContactContext = createContext<ContactState>({
  contacts: [],
  addContact: (contact: any) => {},
  deleteContact: (id: string) => {},
  current: null,
  setCurrent: (contact: Contact) => {},
  clearCurrent: () => {},
});

export default ContactContext;
