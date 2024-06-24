import PropTypes from "prop-types";

function Container({ className, children }) {
  return (
    <div className={`flex md:px-32 md:py-[72px] gap-16 w-full ${className ? className : ''}`}>
      {children}
    </div>
  )
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
