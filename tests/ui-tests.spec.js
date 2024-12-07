import { test, expect } from '@playwright/test';
import { App } from "../src/pages/index.js";
import { ContactBuilder, UserBuilder } from '../src/helper/index.js';


const URL = "https://thinking-tester-contact-list.herokuapp.com";
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
        await app.mainPage.open(URL);
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
            .addNotValidPassword()
            .generate();

        app = new App(page);
        await app.mainPage.open(URL);
        await app.mainPage.clickSignUp();
        await app.addUser.fillField(user.userFirstName, user.userLastName, user.userEmail, user.userPassword);
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
        await app.addContact.fillField(contact.userFirstName, contact.userLastName);
        await app.addContact.clickSubmitButton();

        await expect(await app.contactList.contactsTable).toContainText(contact.userFirstName);
        await expect(await app.contactList.contactsTable).toContainText(contact.userLastName);
    });

    test("Check correct login", async ({ page }) => {
        await app.contactList.clickLogout();

        await app.mainPage.fillField(user.userEmail, user.userPassword);
        await app.mainPage.clickSubmit();

        await expect(await app.contactList.contacts).toBeVisible();
    });

    test("Check contact list, after not add contact", async ({ page }) => {
        await app.contactList.clickAddNewContact();
        await app.addContact.clickCancelButton();

        await expect(await app.contactList.contactsTable).toBeDefined();
    });

    test("Make new user with used email", async ({ page }) => {
        await app.contactList.clickLogout();

        await app.mainPage.clickSignUp();
        await app.addUser.fillField(user.userFirstName, user.userLastName, user.userEmail, user.userPassword);
        await app.addUser.clickSubmit();

        await expect(await app.addUser.errorValidation).toContainText(emailBusy);
    });
});


