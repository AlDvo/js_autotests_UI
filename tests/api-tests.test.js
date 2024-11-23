import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

let URL = "https://thinking-tester-contact-list.herokuapp.com/";
let token;
let data;
let contact;
let newContact;

test.describe("API challenge", () => {

  test.beforeEach(async ({ page }) => {
    token = faker.internet.jwt();
    data = {
      "firstName": faker.person.firstName(),
      "lastName": faker.person.lastName(),
      "email": faker.internet.email(),
      "password": faker.internet.password(),
    };
    contact = {
      "firstName": faker.person.firstName(),
      "lastName": faker.person.lastName(),
      "birthdate": faker.date.birthdate().toISOString().substring(0, 10),
      "email": faker.internet.email(),
      "phone": faker.phone.number({ style: 'national' }),
      "street1": faker.location.streetAddress(),
      "street2": faker.location.streetAddress(),
      "city": faker.location.city(),
      "stateProvince": faker.location.state(),
      "postalCode": faker.location.countryCode('numeric'),
      "country": faker.location.country(),
    }

    newContact = {
      "firstName": faker.person.firstName(),
      "lastName": faker.person.lastName(),
      "birthdate": faker.date.birthdate().toISOString().substring(0, 10),
      "email": faker.internet.email(),
      "phone": faker.phone.number({ style: 'national' }),
      "street1": faker.location.streetAddress(),
      "street2": faker.location.streetAddress(),
      "city": faker.location.city(),
      "stateProvince": faker.location.state(),
      "postalCode": faker.location.countryCode('numeric'),
      "country": faker.location.country(),
    }
  });


  test("Add user ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    expect(responseAddUser.status()).toBe(201);
  });

  test("Log In User", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headers = await responseAddUser.json();
    let userToken = headers['token'];

    expect(responseAddUser.status()).toBe(201);

    let response = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    expect(response.status()).toBe(200);
  });

  test("Log Out User", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();

    let response = await request.post(`${URL}users/logout`, {
      headers: {
        'Authorization': `Bearer ${headersAuth["token"]}`,
      }
    });

    let headers = await responseAuth.json();

    expect(headers['user']).toEqual(headersAuth['user']);
    expect(response.status()).toBe(200);
  });

  test("Get User Profile ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let response = await request.get(`${URL}users/me`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      }
    });

    let headers = await response.json();
    expect(headers).toEqual(headersAuth['user']);
    expect(response.status()).toBe(200);
  });

  test("Delete User ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let response = await request.delete(`${URL}users/me`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      }
    });

    expect(response.status()).toBe(200);
  });

  test("Add Contact ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let response = await request.post(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: contact,
    });

    let headers = await response.json();

    expect(headers['firstName']).toEqual(contact['firstName']);
    expect(headers['lastName']).toEqual(contact['lastName']);
    expect(response.status()).toBe(201);
  });

  test("Delete Contact ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let responseAddContact = await request.post(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: contact,
    });

    let headersAddContact = await responseAddContact.json();
    let id = headersAddContact['_id'];

    expect(responseAddContact.status()).toBe(201);

    let response = await request.delete(`${URL}contacts/${id}`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
    });

    expect(response.status()).toBe(200);
  });

  test("Get Contact ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let responseAddContact = await request.post(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: contact,
    });

    let headersAddContact = await responseAddContact.json();
    let id = headersAddContact['_id'];

    expect(responseAddContact.status()).toBe(201);

    let response = await request.get(`${URL}contacts/${id}`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
    });

    let headers = await response.json();
    expect(headers['firstName']).toEqual(contact['firstName']);
    expect(headers['lastName']).toEqual(contact['lastName']);
    expect(response.status()).toBe(200);
  });

  test("Get Contact List", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let responseAddContactFirst = await request.post(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: contact,
    });

    expect(responseAddContactFirst.status()).toBe(201);

    let responseAddContactSecond = await request.post(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: contact,
    });

    expect(responseAddContactSecond.status()).toBe(201);

    let response = await request.get(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
    });

    let headers = await response.json();

    expect(headers.length).toBe(2);
    expect(response.status()).toBe(200);
  });

  test("Update Contact ", async ({ request }) => {
    let responseAddUser = await request.post(`${URL}users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    });

    let headersAddUser = await responseAddUser.json();
    let userToken = headersAddUser['token'];

    expect(responseAddUser.status()).toBe(201);

    let responseAuth = await request.post(`${URL}users/login`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
      data: {
        "email": data["email"],
        "password": data['password'],
      }
    });

    let headersAuth = await responseAuth.json();
    expect(responseAuth.status()).toBe(200);

    let responseAddContact = await request.post(`${URL}contacts`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: contact,
    });

    let headersAddContact = await responseAddContact.json();
    let id = headersAddContact['_id'];

    expect(responseAddContact.status()).toBe(201);

    let responseGetContact = await request.get(`${URL}contacts/${id}`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
    });

    let headersGetContact = await responseGetContact.json();
    expect(responseGetContact.status()).toBe(200);

    let response = await request.put(`${URL}contacts/${id}`, {
      headers: {
        'Authorization': `Bearer ${headersAuth['token']}`,
      },
      data: newContact
    });

    let headers = await response.json();    
    
    expect(headersGetContact["firstName"]).not.toEqual(headers["firstName"]);
    expect(response.status()).toBe(200);
  });

});