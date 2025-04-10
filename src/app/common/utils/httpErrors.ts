import { RequestMethods } from "../types/request-methods.enum";
import { httpErrors } from "./handle-errors";

export const handleHttpRequest = async (
  url: string | undefined,
  path: string,
  method: RequestMethods,
  body?: Record<string, string>
): Promise<Response | null> => {
  try {
    const headers: Record<string, string> = {
      "cache-control": "no-cache",
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${url}/${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return httpErrors(response);
  } catch (error) {
    return null;
  }
};
