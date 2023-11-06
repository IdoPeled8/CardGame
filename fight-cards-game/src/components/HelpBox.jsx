// HelpInstructions.js
import "./helpBox.css";
import React from "react";

const HelpBox = () => {

  return (
    <div className="help-modal">
      <div className="help-content">
        <p className="helpContent">1.you can attack player by clicking on his health. <br /><br />
        2.you can change guard by clicking on any guard. <br /><br />
        3.you can accumulate to your hand by clicking on accumulate card</p>
      </div>
    </div>
  );
};

export default HelpBox;
