import { test, expect } from '../fixtures';

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ page, loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await productsPage.expectLoaded();
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
  });

  test('shows an error when password is missing', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.loginButton.click();

    await loginPage.expectErrorMessage('Password is required');
  });
});
