import { createContext } from 'react';

import { ContactState } from './ContactState';

const contactContext = createContext<ContactState | null>(null);

export default contactContext;
