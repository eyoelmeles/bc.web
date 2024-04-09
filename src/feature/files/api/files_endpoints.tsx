import { api } from "../../../store/app_api";
import { FileModel } from "../model/file";
import { Folder } from "../model/folder";

export const filesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFolders: builder.query<Folder[], any>({
      query: (data) => ({
        url: "/folder/all",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["folder"],
    }),
    getFiles: builder.query<FileModel[], any>({
      query: (data) => ({
        url: "/file",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["file"],
    }),
    getFolderById: builder.query<Folder, any>({
      query: (data) => ({
        url: "/folder",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["folder"],
    }),
    getFileById: builder.query<FileModel, any>({
      query: (data) => ({
        url: "/file",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["file"],
    }),
    getFileByFolderId: builder.query<FileModel[], any>({
      query: (data) => ({
        url: "/file/folder",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["file"],
    }),
    createFolder: builder.mutation<any, any>({
      query: (data) => ({
        url: "/folder",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["folder"] : []),
    }),
    createFile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/file",
        method: "post",
        headers: data?.headers,
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["file"] : []),
    }),
    updateFolder: builder.mutation<any, any>({
      query: (data) => ({
        url: "/folder",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["folder"] : []),
    }),
    updateFile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/file",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["file"] : []),
    }),
    deleteFolder: builder.mutation<any, any>({
      query: (data) => ({
        url: "/folder",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["folder"] : []),
    }),
    deleteFile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/file",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["file"] : []),
    }),
    // ... add more user-related endpoints here
  }),
});

export const {
  useGetFoldersQuery,
  useGetFilesQuery,
  useGetFolderByIdQuery,
  useGetFileByIdQuery,
  useGetFileByFolderIdQuery,
  useCreateFolderMutation,
  useCreateFileMutation,
  useUpdateFolderMutation,
  useUpdateFileMutation,
  useDeleteFolderMutation,
  useDeleteFileMutation,
} = filesEndpoints;
