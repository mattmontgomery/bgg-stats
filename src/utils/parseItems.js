export default function parseItems(items = []) {
  return items.map(item => ({
    ...item,
    name: item.name.__text,
    numplays: parseInt(item.numplays),
    status: Object.entries(item.status).reduce((acc, item) => {
      acc[item[0]] = item[1] === "1";
      return acc;
    }, {})
  }));
}
