import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Breadcrumb({ links }) {
  const navigate = useNavigate();

  return (
    <nav className="text-sm font-normal text-black">
      <ol className="list-none p-0 inline-flex">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            {index < links.length - 1 && (
              <div>
                <button
                  onClick={() => navigate(link.href)}
                  className="text-black"
                >{link.name}</button><span className="mx-2">/</span>
              </div>
            )}
            {index === links.length - 1 && (
              <span className="text-primary">{link.name}</span>
            )}
          </li>
        ))}
      </ol>
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
