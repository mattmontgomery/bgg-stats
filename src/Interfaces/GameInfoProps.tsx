export default interface IGameInfoProps {
  field: string;
  label: string;
  render: (props: {}) => React.ReactNode;
}
