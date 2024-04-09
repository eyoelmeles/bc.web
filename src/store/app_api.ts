import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../core/utils/custom_base_query";

export const BASE_URL = "http://192.168.43.82:5259";
export const api = createApi({
  // baseQuery: axiosBaseQuery({ baseUrl: "http://192.168.43.82:5259" }),
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [
    "site",
    "user",
    "folder",
    "rfi",
    "file",
    "lookup",
    "schedule",
    "inspection",
    "work-item",
    "daily-report",
    "cost",
    "material"
  ],
  endpoints: (builder) => ({
    // your endpoints here
  }),
});
