import { test, expect } from "@playwright/test";

test.describe('Navegación en Saucedemo', () => {

    test('Navegar en saucedemo - Carrito', async ({ page }, testInfo) => {

        await page.route('**/*.{png,jpg,jpeg}', route => {
            route.abort();
        });


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


    test('Validate JSON Books', async ({ page }, testInfo) => {

        await page.route('https://demoqa.com/BookStore/v1/Books', async (route) => {
            route.fulfill({
                status: 304,
                contentType: 'application/json',
                body: `
                {
  "books": [
    {
      "isbn": "9781449325862",
      "title": "El superlibro de Eduardo Navarro",
      "subTitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "publish_date": "2020-06-04T08:48:39.000Z",
      "publisher": "O'Reilly Media",
      "pages": 234,
      "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
      "website": "http://chimera.labs.oreilly.com/books/1230000000561ddd/index.html"
    },
    {
      "isbn": "9781449331818",
      "title": "Learning JavaScript Design Patterns",
      "subTitle": "A JavaScript and jQuery Developer's Guide",
      "author": "Addy Osmani",
      "publish_date": "2020-06-04T09:11:40.000Z",
      "publisher": "O'Reilly Media",
      "pages": 254,
      "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",
      "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
    },
    {
      "isbn": "44540545",
      "title": "Libro de un nuevo lenguaje de Programación",
      "subTitle": "A JavaScript and jQuery Developer's Guide aaa",
      "author": "Osama Bin Laden",
      "publish_date": "2020-06-04T09:11:40.000Z",
      "publisher": "O'Reilly Media Osama",
      "pages": 2100,
      "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",
      "website": "http://www.addyosmani.com/resources/imageexample/book/"
    }
  ]
}
                `

            });

        });

        await page.goto('https://demoqa.com/books');
        await page.pause();
        await page.screenshot({ path: 'screenshots/books.png' });

    });

});