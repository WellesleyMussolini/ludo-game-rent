import { RequestMethods } from "../types/request-methods.enum";

export const handleFetchOptions = (
  methods: RequestMethods,
  body?: Record<string, string>
) => {
  const headers: Record<string, string> = {
    "cache-control": "no-cache",
  };

  const isBodyRequiredMethod = isPutOrPostMethod(methods);

  if (isBodyRequiredMethod) {
    headers["Content-Type"] = "application/json";
  }

  return {
    method: methods,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};

const isPutOrPostMethod = (method: RequestMethods): boolean => {
  return method === RequestMethods.PUT || method === RequestMethods.POST;
};
