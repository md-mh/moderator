import axios from "axios";
import { rootApi } from "./apiUrl";

const rootClient = axios.create({ baseURL: rootApi });

export const rootReq = async ({ ...options }) => {
  const res = await rootClient(options);
  return res;
};
