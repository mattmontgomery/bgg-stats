import React, { useState } from "react";
import IToggleable from "../Interfaces/Toggleable";

export default (
  Component: React.ComponentType<IToggleable & any>,
  initialState: boolean = false
) => {
  return function WithToggle() {
    const [isOpen, toggle] = useState(initialState);
    return <Component open={isOpen} toggle={toggle} />;
  };
};
