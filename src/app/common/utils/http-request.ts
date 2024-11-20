export const httpRequest = async (
  url: string | undefined,
  path: string,
  options: RequestInit = {}
): Promise<Response | null> => {
  try {
    const response = await fetch(`${url}/${path}`, {
      ...options, // Spread operator for flexibility (method, headers, body, etc.)
    });

    if (response.status === 404) return null;

    if (response.status === 400) throw new Error("Bad Request");

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
