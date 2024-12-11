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

    addPassword(number = 10) {
        this.userPassword = faker.internet.password(number);
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                firstName: this.userFirstName,
                lastName: this.userLastName,
                email: this.userEmail,
                password: this.userPassword
            }

        );
        return copied;
    }
}