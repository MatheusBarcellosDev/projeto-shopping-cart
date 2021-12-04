const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it("Verifica se ao chamar a função com o parametro '<ol><li>Item</li></ol>' o método local storage é chamado", () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it("Verifica se ao chamar a função com o parametro '<ol><li>Item</li></ol>' o método local storage é chamado com o parâmetro 'cartItems'", () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
