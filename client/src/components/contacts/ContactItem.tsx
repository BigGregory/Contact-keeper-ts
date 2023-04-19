import { useContext } from 'react';
import { Contact } from '../../types';
import ContactContext from '../../context/contact/ContactContext';

interface ContactItemProp {
  contact: Contact;
}

const ContactItem = ({
  contact: { name, email, phone, type, id },
}: ContactItemProp) => {
  const { deleteContact } = useContext(ContactContext);
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
        <button className="btn btn-dark btn-sm" onClick={() => {}}>
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            id && deleteContact(id);
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
