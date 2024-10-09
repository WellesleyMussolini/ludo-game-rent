export const httpRequest = async (
  path: string,
  options: RequestInit = {}
): Promise<Response | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    ...options, // Spread operator for flexibility (method, headers, body, etc.)
  });

  if (response.status === 404) return null; // Return null for 404 status instead of throwing an error

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response;
};
