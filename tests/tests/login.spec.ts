import LoginPage from "../pages/LoginPages.ts";
import { test, expect } from "@playwright/test";
import { snap, highlightAndSnapBeforeClick  } from "../../utils/utils.ts";

test.describe("Login Tests Saucedemo", () => {    
    let loginPage: LoginPage;
    const URL: string = process.env.URL_SAUCEDEMO!;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto(URL);
    });
    
    test("Login with valid credentials", async ({ page }, testInfo) => {
        //await loginPage.login("eduardo", "SuperSecretPassword!");
        await loginPage.fillUsername("standard_user");
        await snap(page, testInfo, 'fill_username');
        await loginPage.fillPassword("secret_sauce");
        const loginButton = page.locator('#login-button');
        //await loginPage.clickLoginButton();
        await highlightAndSnapBeforeClick(loginButton, testInfo, 'boton_login_resaltado');

    });
});