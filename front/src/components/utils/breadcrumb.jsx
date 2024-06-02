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
                  className="text-primary"
                >{link.name}</button><span className="mx-2">/</span>
              </div>
            )}
            {index === links.length - 1 && (
              <span>{link.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
