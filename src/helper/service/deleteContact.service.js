export class DeleteContact {

    async delete(request, URL, userToken, id) {
        let response = await request.delete(`${URL}contacts/${id}`, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
          });

        return response;
    }
}