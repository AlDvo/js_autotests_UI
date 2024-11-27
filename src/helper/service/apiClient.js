import { AddContactApi, AddUserApi, DeleteContact, DeleteUser, GetContact, GetContactList, GetUser, LogInUser, LogOutUser, UpdateContact } from "./index";

export class AppClient {
    constructor() {
        this.addContact = new AddContactApi();
        this.addUser = new AddUserApi();
        this.deleteContact = new DeleteContact();
        this.deleteUser = new DeleteUser();
        this.getContact = new GetContact();
        this.getContactList = new GetContactList();
        this.getUser = new GetUser();
        this.logIn = new LogInUser();
        this.logOut = new LogOutUser();
        this.updateContact = new UpdateContact();
    }
}