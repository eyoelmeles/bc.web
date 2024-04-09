import { api } from "../../../store/app_api";
import { Inspection } from "../model/inspection";

export const inspectionEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getInspections: builder.query<Inspection[], any>({
      query: (data) => ({
        url: "/inspection/all",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["inspection"],
    }),
    getInspectionByStatus: builder.query<Inspection[], any>({
      query: (data) => ({
        url: "/inspection/status",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["inspection"],
    }),
    getInspectionBySchedule: builder.query<Inspection[], any>({
      query: (data) => ({
        url: "/inspection/schedule",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["inspection"],
    }),
    createInspection: builder.mutation<string, any>({
      query: (data) => ({
        url: "/inspection",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["inspection"] : []),
    }),
    updateInspection: builder.mutation<string, any>({
      query: (data) => ({
        url: "/inspection",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["inspection"] : []),
    }),
    deleteInspection: builder.mutation<any, any>({
      query: (data) => ({
        url: "/inspection",
        method: "delete",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["inspection"] : []),
    }),
    // ... add more user-related endpoints here
  }),
});

export const {
  useGetInspectionsQuery,
  useGetInspectionByScheduleQuery,
  useLazyGetInspectionByScheduleQuery,
  useGetInspectionByStatusQuery,
  useCreateInspectionMutation,
  useUpdateInspectionMutation,
  useDeleteInspectionMutation,
} = inspectionEndpoints;
