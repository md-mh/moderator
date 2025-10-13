import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useGet } from "@/utils/get";
import { usePost } from "@/utils/post";
import { ModeratorList } from "@/types/moderator";
import { useDelete } from "@/utils/delete";
import { toast } from "react-toastify";

// Adjust types as needed
export type FormData = Record<string, unknown>;
export type SuccessRes = { message: string };
export type ErrorRes = { message: string };

const Moderator = {
  useAddModeratorMutation: (
    options?: UseMutationOptions<SuccessRes, AxiosError<ErrorRes>, FormData>
  ) => {
    const post = usePost();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: FormData) => {
        const res = await post(`moderators/add`, data);
        return res;
      },
      onSuccess: () => {
        toast.success("Moderator added successfully");
        queryClient.invalidateQueries({
          queryKey: ["moderator", "profile"],
        });
      },
      ...options,
    });
  },

  useDeleteModeratorMutation: (
    options?: UseMutationOptions<SuccessRes, AxiosError<ErrorRes>, FormData>
  ) => {
    const del = useDelete();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: FormData) => {
        const res = await del(`moderators/${data?.id}`);
        return res;
      },
      onSuccess: () => {
        toast.success("Moderator deleted successfully");
        queryClient.invalidateQueries({
          queryKey: ["moderator", "profile"],
        });
      },
      ...options,
    });
  },

  useGetModeratorListQuery: (
    params?: Record<string, string>,
    options?: UseQueryOptions<ModeratorList, AxiosError<ErrorRes>>
  ) => {
    const get = useGet();
    const { data, error, isLoading, isError, ...rest } = useQuery<
      ModeratorList,
      AxiosError<ErrorRes>
    >({
      queryKey: ["moderator", "profile"],
      queryFn: async () => {
        const searchParams = new URLSearchParams(params).toString();
        return await get(`moderators/all?${searchParams}`);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      ...options,
    });
    return {
      data,
      error,
      isLoading,
      isError,
      ...rest,
    };
  },
};

export default Moderator;
