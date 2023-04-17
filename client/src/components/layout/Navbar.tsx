import { Link } from 'react-router-dom';

interface NavbarProps {
  title: string;
  icon: string;
}

const Navbar = ({ title, icon }: NavbarProps) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
