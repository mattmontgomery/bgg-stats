import React, { useState } from "react";
import IFavoriteable from "../Interfaces/Favoriteable";

export default (
  Component: React.ComponentType<IFavoriteable & any>,
  initialState: boolean = false
) => {
  return function WithFavorite(props: any) {
    const [isFavorite, toggle] = useState(initialState);
    return (
      <Component {...props} isFavorite={isFavorite} toggleFavorite={toggle} />
    );
  };
};
