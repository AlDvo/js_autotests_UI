import { BasePage } from "./base.page.js";
import * as allure from "allure-js-commons";
import {faker} from "@faker-js/faker";

export class AddUser extends BasePage {  
    constructor(page) {
        super(page);
        this.submit = page.getByRole('button', {name: 'submit'});
        this.cancel = page.getByRole('button', {name: 'cancel'});

        this.errorValidation = page.locator('//*[@id="error"]');

        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.emailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('Password');
    }

    async clickSubmit(){
        await allure.step(`Нажать кнопку submit`, async ({ page }) => {
            await this.submit.click();
        });
    }

    async clickCancel(){
        await allure.step(`Нажать кнопку cancel`, async ({ page }) => {
            await this.cancel.click();
        });
    }

    async fillField(firstName = "", lastName = "", email = "", password = ""){
        await allure.step(`Заполнить поля валидными данными`, async ({ page }) => {
            await this.firstNameField.click();
            await this.firstNameField.fill(firstName);
            await this.lastNameField.click();
            await this.lastNameField.fill(lastName);
            await this.emailField.click();
            await this.emailField.fill(email);
            await this.passwordField.click();
            await this.passwordField.fill(password);
        });
    }
}
