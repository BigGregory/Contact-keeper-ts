import { Contact } from '../../types';

interface ContactItemProp {
  contact: Contact;
}

const ContactItem = ({
  contact: { name, email, phone, type },
}: ContactItemProp) => {
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
      </ul>
    </div>
  );
};

export default ContactItem;
