import { test, expect } from '@playwright/test';
import { snap, highlightAndSnapBeforeClick  } from '../utils/utils.ts';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Test página demo', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.locator('#firstName').fill('Eduardo');
  await page.locator('#lastName').fill('Navarro');
  await page.keyboard.press('Tab');
  await page.getByPlaceholder('name@example.com').fill('F0V0c@example.com');
  await page.locator('input[placeholder="First Name"]').fill('Aliss');



});

test('Login en SPRCOnline como Terminal', async ({ page }) => {

  const USER = 'EDUARDOTER';
  const PASSWORD = '123456';
  const URL_LOGIN = 'https://test.puertocartagena.com/test-sprconline_7/SPRCOnLine.nsf/acceso?OpenForm';
  const COMPANY = 'MSK';
  const mainFrame = await page.locator('frame[name="main"]').contentFrame();

  await page.goto(URL_LOGIN);
  await page.locator('//input[@name="Username"]').fill(USER);
  await page.fill('//input[@name="Password"]', PASSWORD); //Otra forma de usar fill Xpath Selector
  await page.locator('input[type="submit"]').click(); //CSS Selector

  await page.pause();

  await mainFrame.locator(`input[value="${COMPANY}"]`).click();
  console.log(`Empresa seleccionada: ${COMPANY}`);
  await mainFrame.locator('//input[@value="Submit"]').click();  
  //await expect(mainFrame.getByText('InicioHOM00 Usuario:')).toBeVisible(); //El selector parece que cambió

 console.log('Login exitoso en SPRCOnline como Terminal');
  await page.screenshot({ path: 'screenshots/sprconline_terminal_login.png' });


});

/**
 * ELEMENTOS
 * getByPlaceholder: Busca un elemento por su atributo placeholder.
 * getByRole: Busca un elemento por su rol accesible.
 * getByText: Busca un elemento por su texto visible.
 * getByLabel: Busca un elemento por su etiqueta asociada.
 * getByTestId: Busca un elemento por su atributo data-testid.
 * getByAltText: Busca un elemento por su texto alternativo (alt).
 * getByTitle: Busca un elemento por su atributo title.
 * getByCSS: Busca un elemento por su selector CSS.
 * getByXPath: Busca un elemento por su selector XPath.
 * getById: Busca un elemento por su atributo id.
 * getByClass: Busca un elemento por su atributo class.
 * getByName: Busca un elemento por su atributo name.
 * getByValue: Busca un elemento por su atributo value.
 * getByTextContent: Busca un elemento por su contenido de texto.
 * getByDataAttribute: Busca un elemento por su atributo data-*.
 * getByTag: Busca un elemento por su etiqueta HTML.
 * 
 * 
 * 
 * 
 * 
 */


test('Test ROLE', async ({ page }) => {
  await page.goto('http://localhost:5500');
  await page.pause();
  await page.getByRole('button', { name: 'Click Me' }).click();
  await page.getByRole('textbox', { name: 'myInput' }).fill('Hello World, estoy progresando hacía la libertad');
  try {
    await expect(page.getByRole('heading', { name: 'Hello World' })).toBeVisible();
    console.log('El texto se encontró correctamente');
  } catch (error) {
    console.error('No se encontro el texto');
  }
  await page.pause();


});

test('Navegar en saucedemo - Carrito', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com/');
  await page.screenshot({ path: 'screenshots/start.png' });
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.screenshot({ path: 'screenshots/typing_username.png' });
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

  const itemContainer = await page.locator('.inventory_list .inventory_item').all();
  const randomIndex = Math.floor(Math.random() * itemContainer.length);
  const randomItem = itemContainer[randomIndex];

  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
  const expectedName = await randomItem.locator('.inventory_item_name').innerText();
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Indice aleatorio: ${randomIndex}`);
  console.log(`Descripción: ${expectedDescription}`);
  console.log(`Nombre: ${expectedName}`);
  console.log(`Precio: ${expectedPrice}`);

  await page.pause();
  await randomItem.getByRole('button', { name: 'Add to cart' }).click();

  await page.locator('.shopping_cart_link').click();

  expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible(); 

  const actualDescription = await page.locator('.cart_item .inventory_item_desc').innerText();
  const actualName = await page.locator('.cart_item .inventory_item_name').innerText();
  const actualPrice = await page.locator('.cart_item .inventory_item_price').innerText();

  expect(actualDescription).toEqual(expectedDescription);
  expect(actualName).toEqual(expectedName);
  expect(actualPrice).toEqual(expectedPrice);

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Eduardo');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Navarro');
  await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your order' })).toBeVisible();

});