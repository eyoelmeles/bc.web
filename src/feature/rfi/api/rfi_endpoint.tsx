import { api } from "../../../store/app_api";
import { RFI } from "../model/rfi";

export const rfiEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getRFIs: builder.query<RFI[], any>({
            query: (data) => ({
                url: "/rfi/bysite",
                method: "get",
                params: data?.params,
            }),
            providesTags: ["rfi"],
        }),
        createRFI: builder.mutation<any, any>({
            query: (data) => ({
                url: "/material",
                method: "post",
                data: data?.body,
                params: data?.params,
            }),
            invalidatesTags: (result) => (result ? ["rfi"] : []),
        }),
        updateRFI: builder.mutation<any, any>({
            query: (data) => ({
                url: "/material",
                method: "put",
                data: data?.body,
                params: data?.params,
            }),
            invalidatesTags: (result) => (result ? ["rfi"] : []),
        }),
        deleteRFI: builder.mutation<any, any>({
            query: (data) => ({
                url: "/material",
                method: "delete",
                body: data?.body,
                params: data?.params,
            }),
            invalidatesTags: (result) => (result ? ["rfi"] : []),
        }),
    }),
});

export const {
    useGetRFIsQuery,
    useCreateRFIMutation,
    useUpdateRFIMutation,
    useDeleteRFIMutation
} = rfiEndpoints;
