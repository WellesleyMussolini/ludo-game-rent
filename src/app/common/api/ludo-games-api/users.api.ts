export const ludoUsersApi = {
  findAll: async () => {
    return (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)).json();
  },

  findById: async (id: string) => {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/get-by-id/${id}`)
    ).json();
  },

  findAndUpdate: async (id: string, newRole: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      }
    );
    return await response.json();
  },
};
