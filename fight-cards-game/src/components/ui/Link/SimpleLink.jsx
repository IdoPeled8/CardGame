import React from "react";
import { Link } from "react-router-dom";
import "./simpleLink.css";

const SimpleLink = ({to, children,color}) => {
  return (
    <Link className={`link btn ${color || "btn-info"}`} to={to}>
      {children}
    </Link>
  );
};

export default SimpleLink;