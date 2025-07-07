import { test, expect } from '@playwright/test';

test.describe('Working with Tables', () => {
    test('test', async ({ page }) => {
        await page.goto('https://cosmocode.io/automation-practice-webtable');
        const table = page.locator('//table[@id="countries"]');
        const rows = await table.locator('//tr').all();

        console.log(`Number of rows: ${rows.length}`);

        /*
        for (let row of rows) {
            console.log(await row.innerText());
        }
        */

        const firstRow = rows.at(35);

        const countryName = await firstRow?.locator('//td[2]').innerText();
        const capitalName = await firstRow?.locator('//td[3]').innerText();
        const primaryLanguage = await firstRow?.locator('//td[5]').innerText();

        console.log(countryName, capitalName, primaryLanguage);

    });

});

test.describe('Working with Tables2', () => {
    test('test2', async ({ page }) => {
        await page.goto('https://cosmocode.io/automation-practice-webtable');
        const table = page.locator('//table[@id="countries"]');
        const rows = await table.locator('//tr').all();

        const countries: Country[] = [];

        console.log(`Number of rows: ${rows.length}`);



        for (let row of rows) {
            let country: Country = {
                countryName: await row.locator('//td[2]').innerText(),
                capitalName: await row.locator('//td[3]').innerText(),
                currency: await row.locator('//td[4]').innerText(),
                primaryLanguage: await row.locator('//td[5]').innerText()
            };
            countries.push(country);
        }

        const languague = 'English';
        const filteredCountries = countries.filter(country => country.primaryLanguage === languague);

        console.log(filteredCountries);

    });

});

interface Country {
    countryName: string;
    capitalName: string;
    currency: string;
    primaryLanguage: string;
}