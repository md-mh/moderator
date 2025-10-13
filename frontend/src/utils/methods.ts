import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
import { rootReq } from "./axios";
import { useSession } from "next-auth/react";

interface MutationParams {
  path: string;
  formData?: object;
  headers?: Record<string, string>;
}

interface CustomUser {
  access_token?: string;
}

interface APIResponse<T = object> {
  data: T;
}

export interface PostOptions {
  invalidateKey?: string | string[];
  onSuccess?: (
    data: APIResponse,
    variables: MutationParams,
    context: unknown
  ) => void;
  onError?: (
    error: unknown,
    variables: MutationParams,
    context: unknown
  ) => void;
  onSettled?: (
    data: APIResponse | undefined,
    error: unknown,
    variables: MutationParams,
    context: unknown
  ) => void;
}

// Get function
export const Get = (key: string, path: string) => {
  const { data: session } = useSession();
  const token: string | undefined = (session?.user as CustomUser)?.access_token;

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [key, { path, headers: { Authorization: "Bearer " + token } }],
    queryFn: async ({ queryKey, signal }) => {
      const { path, headers } = queryKey[1] as {
        path: string;
        headers: Record<string, string>;
      };
      return rootReq({
        method: "GET",
        url: path,
        headers,
        signal,
      });
    },
  });
  return { data: data?.data, error, isLoading, isError, refetch };
};

// Post function
export const Post = (options?: PostOptions) => {
  const { data: session } = useSession();
  const token: string | undefined = (session?.user as CustomUser)?.access_token;
  const queryClient = useQueryClient();

  return useMutation<APIResponse, unknown, MutationParams>({
    mutationFn: async ({ path, formData, headers }) =>
      rootReq({
        method: "POST",
        url: path,
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
          ...headers,
        },
      }),
    onSuccess: (data, variables, context) => {
      if (options?.invalidateKey) {
        queryClient.invalidateQueries({
          queryKey: Array.isArray(options.invalidateKey)
            ? options.invalidateKey
            : [options.invalidateKey],
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
};

// Put function
export const Put = () => {
  const { data: session } = useSession();
  const token: string | undefined = (session?.user as CustomUser)?.access_token;

  return useMutation<APIResponse, unknown, MutationParams>({
    mutationFn: async ({ path, formData }) =>
      rootReq({
        method: "PUT",
        url: path,
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
  });
};

export const PostPublic = () => {
  return useMutation<APIResponse, unknown, MutationParams>({
    mutationFn: async ({ path, formData, headers }) =>
      rootReq({
        method: "POST",
        url: path,
        data: formData,
        headers: {
          ...headers,
        },
      }),
  });
};

export const PutPublic = () => {
  return useMutation<APIResponse, unknown, MutationParams>({
    mutationFn: async ({ path, formData, headers }) =>
      rootReq({
        method: "PUT",
        url: path,
        data: formData,
        headers: {
          ...headers,
        },
      }),
  });
};

// Delete function
export const Delete = () => {
  const { data: session } = useSession();
  const token: string | undefined = (session?.user as CustomUser)?.access_token;

  return useMutation<APIResponse, unknown, MutationParams>({
    mutationFn: async ({ path }) =>
      rootReq({
        method: "DELETE",
        url: path,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
  });
};
