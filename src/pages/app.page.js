import { AddUser, MainPage, ContactList, AddContact } from "./index";

export class App {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.addUser = new AddUser(page);
        this.contactList = new ContactList(page);
        this.addContact = new AddContact(page);
    }
}