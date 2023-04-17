import React, {
  useReducer,
  PropsWithChildren,
  Children,
  ReactNode,
} from 'react';
import uuid from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

interface Contact {
  id: number;
  name: string;
  email: string;
  type: string;
  phone: string;
}

export interface ContactState {
  contacts: Contact[];
}

const ContactState = ({ children }: PropsWithChildren) => {
  const initialState: ContactState = {
    contacts: [
      {
        id: 1,
        name: 'Mariia',
        email: 'mariia@gmail.com',
        type: 'personal',
        phone: '444-44-44',
      },
      {
        id: 2,
        name: 'Joshua',
        email: 'joshua@gmail.com',
        type: 'work',
        phone: '555-55-55',
      },
    ],
  };

  // const [state, dispatch] = useReducer(contactReducer, initialState);
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Contact actions here

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
