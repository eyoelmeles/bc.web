import { api } from "../../../store/app_api";
import { Material } from "../model/material";

export const materialsEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<Material[], any>({
            query: (data) => ({
                url: "/material/all",
                method: "get",
                params: data?.params,
            }),
            providesTags: ["material"],
        }),
        getMaterialById: builder.query<Material, any>({
            query: (data) => ({
                url: "/material",
                method: "get",
                params: data?.params,
            }),
            providesTags: ["material"],
        }),
        createMaterial: builder.mutation<any, any>({
            query: (data) => ({
                url: "/material",
                method: "post",
                data: data?.body,
                params: data?.params,
            }),
            invalidatesTags: (result) => (result ? ["material"] : []),
        }),
        updateMaterial: builder.mutation<any, any>({
            query: (data) => ({
                url: "/material",
                method: "put",
                data: data?.body,
                params: data?.params,
            }),
            invalidatesTags: (result) => (result ? ["material"] : []),
        }),
        deleteMaterial: builder.mutation<any, any>({
            query: (data) => ({
                url: "/material",
                method: "delete",
                body: data?.body,
                params: data?.params,
            }),
            invalidatesTags: (result) => (result ? ["material"] : []),
        }),
    }),
});

export const {
    useGetMaterialByIdQuery,
    useGetMaterialsQuery,
    useCreateMaterialMutation,
    useUpdateMaterialMutation,
    useDeleteMaterialMutation
} = materialsEndpoints;
