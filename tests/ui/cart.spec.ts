import { test } from '../fixtures';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('adding a product updates the cart badge', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.expectCartCount(1);
  });

  test('adding two products shows correct count', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.expectCartCount(2);
  });

  test('cart page shows the product that was added', async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await productsPage.goToCart();
    await cartPage.expectItemInCart('Sauce Labs Bolt T-Shirt');
  });
});
