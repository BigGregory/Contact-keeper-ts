import { Dispatch } from 'react';
import { ContactState } from './ContactState';

const contactReducer = (
  state: ContactState,
  action: Dispatch<ContactState>
) => {
  switch (state) {
    default:
      return state;
  }
};

export default contactReducer;
