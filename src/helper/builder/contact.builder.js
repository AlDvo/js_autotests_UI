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
        this.userBirthDate = faker.date.birthdate().toISOString().substring(0, 10);
        return this;
    }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addPhone() {
        this.userPhone = faker.phone.number({ style: 'national' });
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
        this.userPostalCode = faker.location.countryCode('numeric');
        return this;
    }

    addCountry() {
        this.userCountry = faker.location.country();
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                firstName: this.userFirstName,
                lastName: this.userLastName,
                birthdate: this.userBirthDate,
                email: this.userEmail,
                phone: this.userPhone,
                street1: this.userStreetOne,
                street2: this.userStreetTwo,
                city: this.userCity,
                stateProvince: this.userState,
                postalCode: this.userPostalCode,
                country: this.userCountry,
            }

        );
        return copied;
    }
}