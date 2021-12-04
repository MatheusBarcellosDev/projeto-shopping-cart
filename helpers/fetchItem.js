const fetchItem = async (item) => {
  const result = await fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
