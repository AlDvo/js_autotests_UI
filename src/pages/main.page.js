import { BasePage } from "./base.page.js";
import * as allure from "allure-js-commons";

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.apiDocumentation = page.getByRole('link', { name: 'here' });

        this.emailField = page.locator('//*[@id="email"]');
        this.passwordField = page.locator('//*[@id="password"]');
        this.submit = page.getByRole('button', { name: 'submit' });
        this.errorLogIn = page.locator('//*[@id="error"]');

        this.signUp = page.locator('//*[@id="signup"]');
    }

    async clickSubmit() {
        await allure.step(`Авторизоваться в системе`, async ({ page }) => {
            await this.submit.click();
        });
    }

    async clickSignUp() {
        await allure.step(`Перейти на сраницу создания учетной записи`, async ({ page }) => {
            await this.signUp.click();
        });
    }

    async fillField(emailField = "", passwordField = ""){
        await allure.step(`Заполнить поля валидными данными`, async ({ page }) => {
            await this.emailField.click();
            await this.emailField.fill(emailField);
            await this.passwordField.click();
            await this.passwordField.fill(passwordField);
        });
    }
}
