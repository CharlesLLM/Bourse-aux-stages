import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Breadcrumb({ links }) {
  return (
    <nav className="text-sm font-normal text-black">
      <ul className="list-none p-0 inline-flex">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            {index < links.length - 1 && (
              <div>
                <Link to={link.href}>{link.name}</Link>
                <span className="mx-2">/</span>
              </div>
            )}
            {index === links.length - 1 && (
              <span className="text-primary">{link.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string.isRequired,
  })).isRequired,
};

export default Breadcrumb;
