// components/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './SimpleButton.css';

const SimpleButton = ({ onClick, children }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

SimpleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SimpleButton;
