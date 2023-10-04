import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className=" h-[70px] fixed top-0 left-0  text-black w-screen text-center text-lg  ">
      {props.alert && (
        <div
          className={`${
            props.alert.type == "success" ? "bg-green-300" : "bg-red-300"
          } text-lg`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
