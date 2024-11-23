import { BasePage } from "./base.page.js";
import * as allure from "allure-js-commons";

export class AddContact extends BasePage {
    constructor(page) {
        super(page);

        this.fieldFirstName = page.getByPlaceholder('First Name');
        this.fieldLastName = page.getByPlaceholder('Last Name');
        this.fieldBirthDate = page.getByPlaceholder('yyyy-MM-dd');
        this.fieldEmail = page.getByPlaceholder('example@email.com');
        this.fieldPhone = page.getByPlaceholder('8005551234');
        this.fieldStreetFirst = page.getByPlaceholder('Address 1');
        this.fieldStreetSecond = page.getByPlaceholder('Address 2');
        this.fieldCity = page.getByPlaceholder('City');
        this.fieldState = page.getByPlaceholder('State or Province');
        this.fieldPostalCode = page.getByPlaceholder('Postal Code');
        this.fieldCountry = page.getByPlaceholder('Country');


        this.logoutButton = page.getByRole('button', { name: 'logout' });
        this.submitButton = page.getByRole('button', { name: 'submit' });
        this.cancelButton = page.getByRole('button', { name: 'cancel' });

        this.errorValidation = page.locator('//*[@id="error"]');
    }

    async clickLogout() {
        await allure.step(`Нажать кнопку logout`, async ({ page }) => {
            await this.logoutButton.click();
        });
    }

    async clickSubmitButton() {
        await allure.step(`Нажать кнопку submit`, async ({ page }) => {
            await this.submitButton.click();
        });
    }

    async clickCancelButton() {
        await allure.step(`Нажать кнопку cancel`, async ({ page }) => {
            await this.cancelButton.click();
        });
    }

    async fillField(firstName = "", lastName = "", date = '',
        email = "", phone = '', streetOne = '', streetTwo = "",
        city = "", state = '', code = "", country = "") {
        await allure.step(`Заполнить поля валидными данными`, async ({ page }) => {
            await this.fieldFirstName.click();
            await this.fieldFirstName.fill(firstName);
            await this.fieldLastName.click();
            await this.fieldLastName.fill(lastName);
            await this.fieldBirthDate.click();
            await this.fieldBirthDate.fill(date);
            await this.fieldEmail.click();
            await this.fieldEmail.fill(email);
            await this.fieldPhone.click();
            await this.fieldPhone.fill(phone);
            await this.fieldStreetFirst.click();
            await this.fieldStreetFirst.fill(streetOne);
            await this.fieldStreetSecond.click();
            await this.fieldStreetSecond.fill(streetTwo);
            await this.fieldCity.click();
            await this.fieldCity.fill(city);
            await this.fieldState.click();
            await this.fieldState.fill(state);
            await this.fieldPostalCode.click();
            await this.fieldPostalCode.fill(code);
            await this.fieldCountry.click();
            await this.fieldCountry.fill(country);
        });
    }

}
