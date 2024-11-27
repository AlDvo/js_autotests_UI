export class UpdateContact {

    async put(request, URL, userToken, id, newContact) {
        let response = await request.put(`${URL}contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
            data: newContact
        });

        return response;
    }
}