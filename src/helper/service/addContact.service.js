export class AddContactApi {

    async post(request, URL, userToken, contact) {
        const response = await request.post(`${URL}contacts`, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
            data: contact,
          });

        return response;
    }
}