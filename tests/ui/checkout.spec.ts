import { test } from '../fixtures';

test.describe('Checkout flow', () => {
  test('user can complete an order end to end', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Log in
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Add a product and go to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.expectItemInCart('Sauce Labs Backpack');

    // 3. Checkout
    await cartPage.goToCheckout();
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.finishOrder();

    // 4. Confirm order completed
    await checkoutPage.expectOrderComplete();
  });
});
