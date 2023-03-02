const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
const userdata = require('../user');

test('Успешная авторизация', async ({ page }) => {
   const email = userdata.valid_email;
   const password = userdata.valid_password;
   await page.goto('https://netology.ru/');
   await page.getByRole('link', { name: 'Войти' }).click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page.getByPlaceholder('Email').click();
   await page.getByPlaceholder('Email').fill(email);
   await page.getByPlaceholder('Пароль').click();
   await page.getByPlaceholder('Пароль').fill(password);
   await page.getByTestId('login-submit-btn').click();
   await page.screenshot({ path: 'screenshot /screen1.png' });
   await expect(page).toHaveURL('https://netology.ru/profile');
   await page.goto('https://netology.ru/profile');
   await page.screenshot({ path: 'screenshot /screen11.png' });
   await page.close();
});

test('Неуспешная авторизация. Введен валидный логин и неправильный пароль', async ({
   page
}) => {
   const email = userdata.valid_email;
   const password = userdata.novalid_password;
   await page.goto('https://netology.ru/');
   await page.getByRole('link', { name: 'Войти' }).click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page.getByPlaceholder('Email').click();
   await page.getByPlaceholder('Email').fill(email);
   await page.getByPlaceholder('Пароль').click();
   await page.getByPlaceholder('Пароль').fill(password);
   await page.getByTestId('login-submit-btn').click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page
      .getByTestId('login-error-hint')
      .textContent('Вы ввели неправильно логин или пароль');
   await page.screenshot({ path: 'screenshot /screen2.png' });
   await page.close();
});

test('Неуспешная авторизация. Введен невалидный логин и неправильный пароль', async ({
   page
}) => {
   const email = userdata.novalid_email;
   const password = userdata.novalid_password;
   await page.goto('https://netology.ru/');
   await page.getByRole('link', { name: 'Войти' }).click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page.getByPlaceholder('Email').click();
   await page.getByPlaceholder('Email').fill(email);
   await page.getByPlaceholder('Пароль').click();
   await page.getByPlaceholder('Пароль').fill(password);
   await page.getByTestId('login-submit-btn').click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page.getByText('Неверный email');
   await page.screenshot({ path: 'screenshot /screen3.png' });
   await page.close();
});

test('Неуспешная авторизация. Введен пустой логин и пустой пароль', async ({
   page
}) => {
   const email = userdata.null_email;
   const password = userdata.null_password;
   await page.goto('https://netology.ru/');
   await page.getByRole('link', { name: 'Войти' }).click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page.getByPlaceholder('Email').click();
   await page.getByPlaceholder('Email').fill(email);
   await page.getByPlaceholder('Пароль').click();
   await page.getByPlaceholder('Пароль').fill(password);
   await page.getByTestId('login-submit-btn').click();
   await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
   await page.getByText('Обязательное поле');
   await page.screenshot({ path: 'screenshot /screen4.png' });
   await page.close();
});
