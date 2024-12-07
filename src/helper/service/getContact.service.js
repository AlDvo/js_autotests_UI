export class GetContact {

    async get(request, URL, userToken, id) {
        let response = await request.get(`${URL}contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        });

        return response;
    }
}