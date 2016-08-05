import React, { PropTypes } from 'react';

const Spinner = ({active}) => {
  return (
    <div className={"spinner" + (active ? " active" : "")}></div>
  );
};

Spinner.propTypes = {
  active: PropTypes.bool.isRequired
};

export default Spinner;
