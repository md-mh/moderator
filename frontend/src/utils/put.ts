import Axios from "axios";
import { rootApi } from "./apiUrl";
// import { getStatusMessage } from "./statusMessages";
import { toast } from "react-toastify";

export function usePut() {
  const token = localStorage.getItem("token");

  const put = async (url: string, data: unknown) => {
    try {
      const res = await Axios.put(`${rootApi}${url}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      // const toastMessage = getStatusMessage(res.status);
      // toast.success(res.data.message || toastMessage);

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
  return put;
}
