import { faker } from '@faker-js/faker';

//класс билдер, для создания тестовых сущностей
//с разным набором параметров, набор параметров задается за счет функций

export class UserBuilder {
    addFirstName() {
        this.userFirstName = faker.person.firstName();
        return this;
    }

    addLastName() {
        this.userLastName = faker.person.lastName();
        return this;
    }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addPassword() {
        this.userPassword = faker.internet.password();
        return this;
    }

    addNotValidPassword() {
        this.userNotValidPassword = faker.internet.password(3);
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                userFirstName: this.userFirstName,
                userLastName: this.userLastName,
                userEmail: this.userEmail,
                userPassword: this.userPassword,
                userNotValidPassword: this.userNotValidPassword,
            }

        );
        return copied;
    }
}