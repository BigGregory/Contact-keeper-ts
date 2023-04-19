import React, {
  useReducer,
  PropsWithChildren,
  Children,
  ReactNode,
} from 'react';
import { v4 as generateId } from 'uuid';

import ContactContext from './ContactContext';
import contactReducer from './contactReducer';
import { ActionTypes } from '../../types';
import { Contact } from '../../types';

export interface ContactState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
  current: Contact | null;
  setCurrent: (contact: Contact) => void;
  clearCurrent: () => void;
}

const ContactState = ({ children }: PropsWithChildren) => {
  const initialState: ContactState = {
    contacts: [
      {
        id: '1',
        name: 'Maria',
        email: 'mariia@gmail.com',
        type: 'professional',
        phone: '444-44-44',
      },
      {
        id: '2',
        name: 'Joshua',
        email: 'joshua@gmail.com',
        type: 'work',
        phone: '555-55-55',
      },
    ],
    addContact: () => {},
    deleteContact: () => {},
    current: null,
    setCurrent: () => {},
    clearCurrent: () => {},
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Contact actions here
  const addContact = (contact: Contact) => {
    contact.id = generateId();
    dispatch({
      type: ActionTypes.ADD_CONTACT,
      payload: contact,
    });
  };

  const deleteContact = (id: string) => {
    dispatch({
      type: ActionTypes.DELETE_CONTACT,
      payload: id,
    });
  };

  const setCurrent = (contact: Contact) => {
    dispatch({
      type: ActionTypes.SET_CURRENT,
      payload: contact,
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: ActionTypes.SET_CURRENT,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
