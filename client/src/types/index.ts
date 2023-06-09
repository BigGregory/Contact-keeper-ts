export enum ActionTypes {
  ADD_CONTACT = 'ADD_CONTACT',
  DELETE_CONTACT = 'DELETE_CONTACT',
  SET_CURRENT = 'SET_CURRENT',
  CLEAR_CURRENT = 'CLEAR_CURRENT',
  UPDATE_CONTACT = 'UPDATE_CONTACT',
  FILTER_CONTACTS = 'FILTER_CONTACTS',
  CLEAR_FILTER = 'CLEAR_FILTER',
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  type: string;
  phone: string;
}
