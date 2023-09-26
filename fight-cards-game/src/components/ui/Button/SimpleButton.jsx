// components/Button.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './simpleButton.css';


const SimpleButton = ({ onClick, children,color }) => {
  return (
    <button className={`myBtn btn ${color || "btn-primary"}`} onClick={onClick}>
      {children}
    </button>
  );
};

SimpleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SimpleButton;
