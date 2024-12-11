import { faker } from '@faker-js/faker';

//класс билдер, для создания тестовых сущностей
//с разным набором параметров, набор параметров задается за счет функций

export class TokenBuilder {
    addToken() {
        this.token = faker.internet.jwt();
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                token: this.token,
            }

        );
        return copied;
    }
}