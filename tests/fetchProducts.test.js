require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se a função fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
 });
 it('Verifica se a função fecthItem com o argumento "Computador" é chamada corretamente', async () => {
   await fetchProducts('Computador');
   expect(fetch).toHaveBeenCalled();
 });
  it('Verifica se a função fecthItem com o argumento "Computador" retorna um objeto', async () => {
    const result = await fetchProducts('Computador');
    expect(typeof result).toBe('object');
  });
  it('Verifica se ao chamar a função retorna um erro', async () => {
    const result = await fetchProducts();
    const newError = new Error('You must provide an url');

    expect(result).toEqual(newError);
  })
});
