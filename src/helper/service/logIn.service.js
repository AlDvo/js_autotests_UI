export class LogInUser {

    async post(request, URL, userToken, data) {
        let responseAuth = await request.post(`${URL}users/login`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
            data: {
                "email": data["email"],
                "password": data['password'],
            }
        });

        return responseAuth;
    }
}