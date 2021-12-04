require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
   it('Verifica se a função fecthItem é uma função', () => {
      expect(typeof fetchItem).toBe('function');
   });
   it('Verifica se a função fecthItem retorna um objeto', () => {
      expect(typeof fetchItem()).toBe('object');
   });
   it('Verifica se a função fecthItem com o argumento "MLB1615760527" é chamada corretamente,', () => {
      fetchItem("MLB1615760527");
      expect(fetch).toHaveBeenCalled();
   });
   it('Verifica se ao chamar a função retorna um erro', async () => {
    const result = await fetchItem();
    const newError = new Error('You must provide an url');

    expect(result).toEqual(newError);
  })
  
});


