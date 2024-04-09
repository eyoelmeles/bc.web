import { api } from "../../../store/app_api";
import { Schedule } from "../model/schedule";

export const schedulesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchedules: builder.query<Schedule[], any>({
      query: (data) => ({
        url: "/schedule/all",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["schedule"],
    }),
    getRootSchedules: builder.query<Schedule[], any>({
      query: (data) => ({
        url: "/schedule",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["schedule"],
    }),
    getChildSchedules: builder.query<Schedule[], any>({
      query: (data) => ({
        url: "/schedule/child",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["schedule"],
    }),
    createSchedule: builder.mutation<string, any>({
      query: (data) => ({
        url: "/schedule",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["schedule"] : []),
    }),
    updateSchedule: builder.mutation<string, any>({
      query: (data) => ({
        url: "/schedule",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["schedule"] : []),
    }),
    deleteSchedule: builder.mutation<any, any>({
      query: (data) => ({
        url: "/schedule",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["schedule"] : []),
    }),
  }),
});

export const {
  useGetAllSchedulesQuery,
  useGetRootSchedulesQuery,
  useGetChildSchedulesQuery,
  useLazyGetChildSchedulesQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = schedulesEndpoints;
