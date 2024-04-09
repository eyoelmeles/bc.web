import { api } from "../../../store/app_api";

export const dailyReportEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDailyReportByDateRange: builder.query<any, any>({
      query: (data) => ({
        url: "/dailyreport",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["daily-report"],
    }),
    createDailyReport: builder.mutation<any, any>({
      query: (data) => ({
        url: "/dailyreport",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["daily-report"] : []),
    }),
    updateDailyReport: builder.mutation<any, any>({
      query: (data) => ({
        url: "/dailyreport",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["daily-report"] : []),
    }),
  }),
});

export const {
    useGetDailyReportByDateRangeQuery,
    useLazyGetDailyReportByDateRangeQuery,
    useCreateDailyReportMutation
} = dailyReportEndpoints;

