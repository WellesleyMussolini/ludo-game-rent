export const httpErrors = async (response: Response) => {
  console.log("->", response.url);
  if (response.status === 404) return null;

  if (response.status === 400) throw new Error("Bad Request");

  if (response.status === 500) throw new Error("Internal Server Error");

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response;
};
