import { faker } from '@faker-js/faker';

//класс билдер, для создания тестовых сущностей
//с разным набором параметров, набор параметров задается за счет функций

export class ContactBuilder {
    addFirstName() {
        this.userFirstName = faker.person.firstName();
        return this;
    }

    addLastName() {
        this.userLastName = faker.person.lastName();
        return this;
    }

    addBirthDate() {
        this.userBirthDate = faker.date.birthdate();
        return this;
    }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addPhone() {
        this.userPhone = faker.phone.number();
        return this;
    }

    addStreetOne() {
        this.userStreetOne = faker.location.streetAddress();
        return this;
    }

    addStreetTwo() {
        this.userStreetTwo = faker.location.streetAddress();
        return this;
    }

    addCity() {
        this.userCity = faker.location.city();
        return this;
    }

    addState() {
        this.userState = faker.location.state();
        return this;
    }

    addPostalCode() {
        this.userPostalCode = faker.location.countryCode();
        return this;
    }

    addCountry() {
        this.userCountry = faker.location.country();
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                userFirstName: this.userFirstName,
                userLastName: this.userLastName,
                userBirthDate: this.userBirthDate,
                userEmail: this.userEmail,
                userPhone: this.userPhone,
                userStreetOne: this.userStreetOne,
                userStreetTwo: this.userStreetTwo,
                userCity: this.userCity,
                userState: this.userState,
                userPostalCode: this.userPostalCode,
                userCountry: this.userCountry,
            }

        );
        return copied;
    }
}