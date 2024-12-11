import { test, expect } from "@playwright/test";
import { App } from "../src/pages/index.js";
import { ContactBuilder, UserBuilder, TokenBuilder, AppClient } from '../src/helper/index.js';

let URL = "https://thinking-tester-contact-list.herokuapp.com/";
let token;
let user;
let contact;
let newContact;
let appClient;

test.describe("API challenge", () => {

  test.beforeEach(async ({ page }) => {

    appClient = new AppClient();

    token = new TokenBuilder()
      .addToken()
      .generate();

    user = new UserBuilder()
      .addFirstName()
      .addEmail()
      .addLastName()
      .addPassword()
      .generate();

    contact = new ContactBuilder()
      .addFirstName()
      .addLastName()
      .addBirthDate()
      .addEmail()
      .addPhone()
      .addStreetOne()
      .addStreetTwo()
      .addCity()
      .addState()
      .addPostalCode()
      .addCountry()
      .generate();

    newContact = new ContactBuilder()
      .addFirstName()
      .addLastName()
      .addBirthDate()
      .addEmail()
      .addPhone()
      .addStreetOne()
      .addStreetTwo()
      .addCity()
      .addState()
      .addPostalCode()
      .addCountry()
      .generate();
  });


  test("Add user ", async ({ request, page }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);

    let app = new App(page);
    await app.mainPage.open(URL);

    await app.mainPage.fillField(user.email, user.password);
    await app.mainPage.clickSubmit();

    await expect(await app.contactList.contacts).toBeVisible();

    expect(responseAddUser.status()).toBe(201);
  });

  test("Log In User", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headers = await responseAddUser.json();
    let userToken = headers['token'];

    const response = await appClient.logIn.post(request, URL, userToken, user);
    expect(response.status()).toBe(200);
  });

  test("Log Out User", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let responseAuth = await appClient.logIn.post(request, URL, userToken, user);
    let headersAuth = await responseAuth.json();

    let response = await appClient.logOut.post(request, URL, userToken);
    let headers = await responseAuth.json();

    expect(headers['user']).toEqual(headersAuth['user']);
    expect(response.status()).toBe(200);
  });

  test("Get User Profile ", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let response = await appClient.getUser.get(request, URL, userToken);
    let headers = await response.json();

    expect(headers).toEqual(headersAddUser['user']);
    expect(response.status()).toBe(200);
  });

  test("Delete User ", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let response = await appClient.deleteUser.delete(request, URL, userToken);
    expect(response.status()).toBe(200);
  });

  test("Add Contact ", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let response = await appClient.addContact.post(request, URL, userToken, contact);
    let headers = await response.json();

    expect(headers['firstName']).toEqual(contact['firstName']);
    expect(headers['lastName']).toEqual(contact['lastName']);
    expect(response.status()).toBe(201);
  });

  test("Delete Contact ", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let responseAddContact = await appClient.addContact.post(request, URL, userToken, contact);
    let headersAddContact = await responseAddContact.json();
    let id = headersAddContact['_id'];

    expect(responseAddContact.status()).toBe(201);

    let response = await appClient.deleteContact.delete(request, URL, userToken, id);
    expect(response.status()).toBe(200);
  });

  test("Get Contact ", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let responseAddContact = await appClient.addContact.post(request, URL, userToken, contact);
    let headersAddContact = await responseAddContact.json();
    let id = headersAddContact['_id'];

    let response = await appClient.getContact.get(request, URL, userToken, id);
    let headers = await response.json();

    expect(headers['firstName']).toEqual(contact['firstName']);
    expect(headers['lastName']).toEqual(contact['lastName']);
    expect(response.status()).toBe(200);
  });

  test("Get Contact List", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let responseAddContactFirst = await appClient.addContact.post(request, URL, userToken, contact);
    expect(responseAddContactFirst.status()).toBe(201);

    let responseAddContactSecond = await appClient.addContact.post(request, URL, userToken, contact);
    expect(responseAddContactSecond.status()).toBe(201);

    let response = await appClient.getContactList.get(request, URL, userToken);
    let headers = await response.json();

    expect(headers.length).toBe(2);
    expect(response.status()).toBe(200);
  });

  test("Update Contact ", async ({ request }) => {
    const responseAddUser = await appClient.addUser.post(request, URL, token, user);
    expect(responseAddUser.status()).toBe(201);

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    let responseAddContact = await appClient.addContact.post(request, URL, userToken, contact);

    let headersAddContact = await responseAddContact.json();
    let id = headersAddContact['_id'];

    expect(responseAddContact.status()).toBe(201);

    let responseGetContact = await appClient.getContactList.get(request, URL, userToken);
    let headersGetContact = await responseGetContact.json();
    expect(responseGetContact.status()).toBe(200);

    let response = await appClient.updateContact.put(request, URL, userToken, id, newContact);
    let headers = await response.json();

    expect(headersGetContact["firstName"]).not.toEqual(headers["firstName"]);
    expect(response.status()).toBe(200);
  });

});