export const httpRequest = async (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    ...options, // Spread operator for flexibility (method, headers, body, etc.)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};
