export class GetContactList {

    async get(request, URL, userToken) {
        let response = await request.get(`${URL}contacts`, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
          });

        return response;
    }
}