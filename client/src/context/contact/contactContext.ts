import { createContext } from 'react';

import { ContactState } from './ContactState';

const contactContext = createContext<ContactState>({ contacts: [] });

export default contactContext;
