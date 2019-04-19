export default interface IToggleable {
  open: boolean;
  toggle?: (state: boolean) => void;
}
