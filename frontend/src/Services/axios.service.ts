import { config } from "../config";
import axios from "axios";
import { errorToast } from "./toaster.service";

export const postData = async (url: string, data: any) => {
  try {
    const resp = await axios.post(`${config.SERVER_URL}${url}`, data);
    return resp.data;
  } catch (error: any) {
    console.log(error);
    errorToast(error.response.data.error);
  }
};
