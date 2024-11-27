export class DeleteUser {

    async delete(request, URL, userToken) {
        let response = await request.delete(`${URL}users/me`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        });

        return response;
    }
}