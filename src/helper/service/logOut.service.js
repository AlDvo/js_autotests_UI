export class LogOutUser {

    async post(request, URL, userToken) {
        let response = await request.post(`${URL}users/logout`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        });

        return response;
    }
}