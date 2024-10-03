export const ludoApi = {
  boardgames: {
    findAll: async () => {
      return (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boardgames`)
      ).json();
    },

    findById: async (id: string) => {
      return (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/boardgames/get-by-id/${id}`
        )
      ).json();
    },

    findByName: async (name: string) => {
      return (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/boardgames/search-by-name?name=${name}`
        )
      ).json();
    },

    findAndDelete: async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boardgames/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.text();
      return result && JSON.parse(result);
    },
  },

  users: {
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
  },
};
