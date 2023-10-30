import React from "react";

const ButtonPrimary = ({ children, addClass }) => {

  return (
    <button id="bt" className={"py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-blue-400 hover:bg-blue-600 hover:drop-shadow-lg transition-all outline-none  " + addClass}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
