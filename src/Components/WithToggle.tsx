import React, { useState } from "react";

export default (Component: React.ComponentType<any>) => {
    return function WithToggle() {
      const [isOpen, toggle] = useState(false);
      return (
        <Component open={isOpen} toggle={toggle} />
      );
    }
  };
  