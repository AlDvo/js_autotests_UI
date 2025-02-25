import { test, expect } from '@playwright/test';
import { App } from "../src/pages/index.js";
import { ContactBuilder, UserBuilder } from '../src/helper/index.js';


const docURL = "https://documenter.getpostman.com/view/4012288/TzK2bEa8";
const validationFailed = 'Contact validation failed';
const emailBusy = 'Email address is already in use';
const incorrectCredential = 'Incorrect username or password';
let app;
let user;
let contact;

test.describe('Test without login user', () => {

    test.beforeEach(async ({ page }) => {
        app = new App(page);
        await app.mainPage.open('/');
    });

    test("Check incorrect log in", async ({ page }) => {
        await app.mainPage.clickSubmit();
        await expect(await app.mainPage.errorLogIn).toContainText(incorrectCredential);
    });

    test("Go to api documentation", async ({ page }) => {
        await app.mainPage.apiDocumentation.click();
        await expect(page).toHaveURL(docURL);

    });
});

test.describe('Test with login user', () => {
    test.beforeEach(async ({ page }) => {

        user = new UserBuilder()
            .addFirstName()
            .addEmail()
            .addLastName()
            .addPassword()
            .generate();

        app = new App(page);
        await app.mainPage.open('/');
        await app.mainPage.clickSignUp();
        await app.addUser.fillField(user.firstName, user.lastName, user.email, user.password);
        await app.addUser.clickSubmit();

        await expect(await app.contactList.contacts).toBeVisible();
    });

    test("Click logOut", async ({ page }) => {
        await app.contactList.clickLogout();
        await expect(await app.mainPage.signUp).toBeVisible();
    });

    test("Check сontact validation failed", async ({ page }) => {
        await app.contactList.clickAddNewContact();
        await app.addContact.fillField();
        await app.addContact.clickSubmitButton();
        await expect(await app.addContact.errorValidation).toContainText(validationFailed);
    });

    test("Create new contact", async ({ page }) => {
        contact = new ContactBuilder()
            .addFirstName()
            .addLastName()
            .generate();

        await app.contactList.clickAddNewContact();
        await app.addContact.fillField(contact.firstName, contact.lastName);
        await app.addContact.clickSubmitButton();

        await expect(await app.contactList.contactsTable).toContainText(contact.firstName);
        await expect(await app.contactList.contactsTable).toContainText(contact.lastName);
    });

    test("Check contact list, after not add contact", async ({ page }) => {
        await app.contactList.clickAddNewContact();
        await app.addContact.fillField();
        await app.addContact.clickCancelButton();

        await expect(await app.contactList.contactsTable).toBeDefined();
    });
});

test.describe('Test with registered user account', () => {
    test.beforeEach(async ({ page }) => {

        user = new UserBuilder()
            .addFirstName()
            .addEmail()
            .addLastName()
            .addPassword()
            .generate();

        app = new App(page);
        await app.mainPage.open('/');
        await app.mainPage.clickSignUp();
        await app.addUser.fillField(user.firstName, user.lastName, user.email, user.password);
        await app.addUser.clickSubmit();

        await expect(await app.contactList.contacts).toBeVisible();

        await app.contactList.clickLogout();
    });

    test("Make new user with used email", async ({ page }) => {
        await app.mainPage.clickSignUp();
        await app.addUser.fillField(user.firstName, user.lastName, user.email, user.password);
        await app.addUser.clickSubmit();

        await expect(await app.addUser.errorValidation).toContainText(emailBusy);
    });

    test("Check correct login", async ({ page }) => {
        await app.mainPage.fillField(user.email, user.password);
        await app.mainPage.clickSubmit();

        await expect(await app.contactList.contacts).toBeVisible();
    });
});


