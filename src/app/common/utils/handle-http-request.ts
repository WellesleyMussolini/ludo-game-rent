import { RequestMethods } from "../types/request-methods.enum";
import { handleErrors } from "./handle-errors";
import { handleFetchOptions } from "./handle-fetch-options";

export const handleHttpRequest = async (
  url: string | undefined,
  path: string,
  method: RequestMethods,
  body?: Record<string, string>
): Promise<Response | null> => {
  try {
    const response = await fetch(
      `${url}/${path}`,
      handleFetchOptions(method, body)
    );

    return handleErrors(response);
  } catch (error) {
    return null;
  }
};
