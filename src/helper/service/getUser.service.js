export class GetUser {

    async get(request, URL, userToken) {
        let response = await request.get(`${URL}users/me`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        });

        return response;
    }
}