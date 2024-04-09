import { api } from "../../../store/app_api";
import { Lookup } from "../model/lookup";

export const lookupsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLookups: builder.query<Lookup[], any>({
      query: (data) => ({
        url: "/lookup",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["lookup"],
    }),
    getLookupsByLookupType: builder.query<Lookup[], any>({
      query: (data) => ({
        url: "/lookup/bytype",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["lookup"],
    }),
    getLookupTypes: builder.query<any, any>({
      query: (data) => ({
        url: "/lookup/types",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["lookup"],
    }),
    createLookup: builder.mutation<any, any>({
      query: (data) => ({
        url: "/lookup",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["lookup"] : []),
    }),
    updateLookup: builder.mutation<any, any>({
      query: (data) => ({
        url: "/lookup",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["lookup"] : []),
    }),
    deleteLookup: builder.mutation<any, any>({
      query: (data) => ({
        url: "/lookup",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["lookup"] : []),
    }),
  }),
});

export const {
  useGetLookupsQuery,
  useGetLookupsByLookupTypeQuery,
  useGetLookupTypesQuery,
  useCreateLookupMutation,
  useUpdateLookupMutation,
  useDeleteLookupMutation,
} = lookupsEndpoints;
