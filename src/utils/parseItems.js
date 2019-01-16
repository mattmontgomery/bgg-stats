export default function parseItems(items = []) {
  return items.map(item => ({
    ...item,
    name: item.name.__text,
    numplays: parseInt(item.numplays),
    stats: {
      ...item.stats,
      ...Object.entries(item.stats).reduce((acc, item) => {
        acc[item[0]] =
          typeof item[1] === "string" ? parseInt(item[1]) : item[1];
        return acc;
      }, {}),
      rating: {
        ...Object.keys(item.stats.rating).reduce((acc, key) => {
          acc[key] =
            typeof item.stats.rating[key]._value === "string"
              ? parseFloat(item.stats.rating[key]._value)
              : item.stats.rating[key];
          return acc;
        }, {})
      }
    },
    status: Object.entries(item.status).reduce((acc, item) => {
      acc[item[0]] = item[1] === "1";
      return acc;
    }, {})
  }));
}
