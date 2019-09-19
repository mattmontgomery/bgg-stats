export default interface IFavoriteable {
  isFavorite: boolean;
  toggleFavorite: (state: boolean) => void;
}
