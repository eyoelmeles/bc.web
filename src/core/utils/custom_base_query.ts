import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      headers?: AxiosRequestConfig["headers"];
      params?: AxiosRequestConfig["params"];
      uploadProgress?: AxiosRequestConfig["onUploadProgress"];
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params, headers }) => {
      // const [userData, setUserData] = useUserData();
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          headers: headers
            ? headers
            : {
              "Content-Type": "application/json",
            },
          data,
          // params: { ...params, token: userData.token },
          params: { ...params },
        });
        return { data: result.data };
      } catch (axiosError) {
        return {
          error: axiosError,
        };
      }
    };
