import { createContext } from 'react';

import { ContactState } from './ContactState';

const ContactContext = createContext<ContactState>({
  contacts: [],
  addContact: (contact: any) => {},
  deleteContact: (id: string) => {},
});

export default ContactContext;
