import Axios from "axios";
import { rootApi } from "./apiUrl";
import { toast } from "react-toastify";

export function useDelete() {
  const del = async (url: string, params?: Record<string, string>) => {
    try {
      const res = await Axios.delete(`${rootApi}${url}`, {
        params,
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      return res?.data?.result ?? res?.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        "Error: " + error?.response?.data?.error?.message
          ? error?.response?.data?.error?.message
          : error instanceof Error
          ? error.message
          : "An error occurred"
      );

      throw error;
    }
  };
  return del;
}
