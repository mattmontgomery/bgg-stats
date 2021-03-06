import { IAction } from "../Interfaces";

export const DRAWER_ADD_GAME = "drawer/addGame";
export const DRAWER_REMOVE_GAME = "drawer/removeGame";
export const DRAWER_CLEAR = "drawer/clear";
export const removeGame = (payload: string) => ({
  payload,
  type: DRAWER_REMOVE_GAME
});
export const addGame = (payload: string) => ({
  payload,
  type: DRAWER_ADD_GAME
});

export default function drawer(
  state: string[] = [],
  { type, payload }: IAction
) {
  switch (type) {
    case DRAWER_ADD_GAME:
      return state.find(id => id === payload) ? state : [...state, payload];
    case DRAWER_REMOVE_GAME:
      return state.filter(id => id !== payload);
    case DRAWER_CLEAR:
      return [];
    default:
      return state;
  }
}
