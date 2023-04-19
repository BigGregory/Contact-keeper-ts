import { useContext } from 'react';
import { Contact } from '../../types';
import ContactContext from '../../context/contact/ContactContext';

interface ContactItemProp {
  contact: Contact;
}

const ContactItem = ({ contact }: ContactItemProp) => {
  const { deleteContact, setCurrent, clearCurrent } =
    useContext(ContactContext);

  const { name, email, phone, type, id } = contact;

  const onDelete = () => {
    id && deleteContact(id);
    // clearCurrent(); Doubts of using this here
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={`badge ${
            type === 'professional' ? 'badge-success' : 'badge-primary'
          }`}
        >
          {`${type.slice(0, 1).toUpperCase()}${type.slice(1)}`}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
