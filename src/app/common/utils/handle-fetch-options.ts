import { RequestMethods } from "../types/request-methods.enum";

export const handleFetchOptions = (
  methods: RequestMethods,
  body?: Record<string, string>
) => {
  return {
    method: methods,
    headers: {
      "cache-control": "no-cache",
      ...(isBodyRequiredMethod(methods)
        ? { "Content-Type": "application/json" }
        : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  };
};

const isBodyRequiredMethod = (method: RequestMethods): boolean => {
  return method === RequestMethods.PUT || method === RequestMethods.POST;
};
