import Axios from "axios";
import { rootApi } from "./apiUrl";

export function useGetPublic() {
  const get = async (url: string, params?: Record<string, string>) => {
    try {
      const res = await Axios.get(`${rootApi}${url}`, {
        headers: params,
      });
      return res?.data?.result ?? res?.data;
    } catch (error) {
      throw error;
    }
  };
  return get;
}

export function useGet() {
  const get = async (url: string) => {
    try {
      const res = await Axios.get(`${rootApi}${url}`, {});
      return res?.data?.result ?? res?.data;
    } catch (error) {
      throw error;
    }
  };
  return get;
}

export const getServerData = async (url: string) => {
  const response = await fetch(rootApi + url, {
    next: {
      revalidate: 10,
    },
  });
  const repos = await response.json();
  return repos;
};

export async function getIP() {
  try {
    // const response = await fetch("https://api.ipify.org?format=json");
    // const response = await fetch("https://ipapi.co/json");
    const response = await fetch("https://ipwho.is/");
    const data = await response.json();
    return data;
    // return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return null;
  }
}
