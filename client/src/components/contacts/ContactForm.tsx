import { useState, useContext, ChangeEvent, FormEvent } from 'react';

import ContactContext from '../../context/contact/ContactContext';
import { Contact } from '../../types';

const ContactForm = () => {
  const { addContact } = useContext(ContactContext);
  const [contact, setContact] = useState<Contact>({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  const { name, email, phone, type } = contact;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setContact({ ...contact, [event.target.name]: event.target.value });

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h2 className="text-primary">Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onInputChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onInputChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onInputChange}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onInputChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        ></input>
      </div>
    </form>
  );
};

export default ContactForm;
