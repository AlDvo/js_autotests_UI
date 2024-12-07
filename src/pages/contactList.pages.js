import { BasePage } from "./base.page.js";
import * as allure from "allure-js-commons";

export class ContactList extends BasePage { 
    contacts = this.page.locator('.contactTable');

    constructor(page) {
        super(page);
        this.contactsTable = this.contacts.locator('.contactTableBodyRow');

        this.logoutButton = page.getByRole('button', {name: 'logout'});
        this.addNewContact = page.getByRole('button', {name: 'Add a New Contact'});
    }

    async clickLogout(){
        await allure.step(`Нажать кнопку logout`, async ({ page }) => {
            await this.logoutButton.click();
        });
    }

    async clickAddNewContact(){
        await allure.step(`Нажать кнопку add contact`, async ({ page }) => {
            await this.addNewContact.click();
        });
    }

}
