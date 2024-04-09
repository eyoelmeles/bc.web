import { api } from "../../../store/app_api";
import { SiteModel } from "../model/site";

export const siteEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.query<SiteModel[], any>({
      query: (data) => ({
        url: "/site/all",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["site"],
    }),
    getSiteById: builder.query<any, any>({
      query: (data) => ({
        url: "/site",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["site"],
    }),
    getSiteByUser: builder.query<SiteModel[], any>({
      query: (data) => ({
        url: "/site/byuser",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["site"],
    }),
    createSite: builder.mutation<any, any>({
      query: (data) => ({
        url: "/site",
        method: "post",
        data: data?.body,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["site"] : []),
    }),
    updateSite: builder.mutation<any, any>({
      query: (data) => ({
        url: "/site",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["site"] : []),
    }),
    deleteSite: builder.mutation<any, any>({
      query: (data) => ({
        url: "/site",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["site"] : []),
    }),
    assignUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/site/AssignUser",
        method: "post",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["site"] : []),
    }),
    // ... add more user-related endpoints here
  }),
});

export const {
  useGetSitesQuery,
  useGetSiteByIdQuery,
  useGetSiteByUserQuery,
  useCreateSiteMutation,
  useUpdateSiteMutation,
  useDeleteSiteMutation,
  useAssignUserMutation,
} = siteEndpoints;
