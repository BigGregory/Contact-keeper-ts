import { Dispatch } from 'react';

import { Contact, ActionTypes } from '../../types';
import { ContactState } from './ContactState';

interface ActionWithPayload {
  type: ActionTypes;
  payload?: Contact | string | any; // TODO: find generic action type, forced to use any
}

const contactReducer = (state: ContactState, action: ActionWithPayload) => {
  switch (action.type) {
    case ActionTypes.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };

    case ActionTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: [
          ...state.contacts.filter((contact) => contact.id !== action.payload),
        ],
        current: action.payload === state.current?.id ? null : state.current,
      };

    case ActionTypes.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case ActionTypes.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
