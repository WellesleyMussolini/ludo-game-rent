export const ludoGamesApi = {
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
};
