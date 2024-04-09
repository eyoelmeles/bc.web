import { api } from "../../../store/app_api";
import { User } from "../model/user";

export const userEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
      query: (data) => ({
        url: "/user",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["user"],
    }),
    getAllUsers: builder.query<any, any>({
      query: (data) => ({
        url: "/user/all",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["user"],
    }),
    getAllRoles: builder.query<string[], any>({
      query: (data) => ({
        url: "/role/all",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["user"],
    }),
    getUsersBySite: builder.query<User[], any>({
      query: (data) => ({
        url: "/user/bysite",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["user"],
    }),
    createUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/register",
        method: "post",
        data: data?.body,
        params: data?.params,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: (result) => (result ? ["user"] : []),
    }),
    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/user`,
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["user"] : []),
    }),
    deleteUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["user"] : []),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetUsersBySiteQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllRolesQuery,
} = userEndpoints;
