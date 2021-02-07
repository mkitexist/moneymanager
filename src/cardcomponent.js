import React from "react";
import "./cardcomponent.css";
import { Link } from "react-router-dom";

const Cardcomponent = () => {
  return (
    <div className="cardd">
      <Link to="/weekly/7">
        <div className="innerCard"></div>
      </Link>
      <Link to="/netcash">
        <div className="innerCardtwo"></div>
      </Link>
      <Link to="/monthly/30">
        <div className="innerCardthree"></div>
      </Link>
    </div>
  );
};

export default Cardcomponent;
