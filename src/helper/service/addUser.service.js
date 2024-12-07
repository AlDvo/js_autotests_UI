export class AddUserApi {

    async post(request,URL, token, data) {
        let responseAddUser = await request.post(`${URL}users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: data,
        });
        return responseAddUser;
    }
}