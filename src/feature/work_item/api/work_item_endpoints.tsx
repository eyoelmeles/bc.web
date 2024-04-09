import { api } from "../../../store/app_api";
import { EquipmentCost, ManPowerCost, MaterialCost, WorkItem } from "../model/work_item";

export const workItemEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkItemsBySchedule: builder.query<WorkItem[], any>({
      query: (data) => ({
        url: "/workitems/schedule",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["work-item"],
    }),
    getManPowerCost: builder.query<ManPowerCost[], any>({
      query: (data) => ({
        url: "/manpowercost",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["cost"],
    }),
    getMaterialCost: builder.query<MaterialCost[], any>({
      query: (data) => ({
        url: "/materialcost",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["cost"],
    }),
    getEquipmentCost: builder.query<EquipmentCost[], any>({
      query: (data) => ({
        url: "/equipmentcost",
        method: "get",
        params: data?.params,
      }),
      providesTags: ["cost"],
    }),
    createWorkItem: builder.mutation<string, any>({
      query: (data) => ({
        url: "/workitems",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["work-item"] : []),
    }),
    createManpowerCost: builder.mutation<string, any>({
      query: (data) => ({
        url: "/manpowercost",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    createMaterialCost: builder.mutation<string, any>({
      query: (data) => ({
        url: "/materialcost",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    createEquipmentCost: builder.mutation<string, any>({
      query: (data) => ({
        url: "/equipmentcost",
        method: "post",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    updateWorkItem: builder.mutation<any, any>({
      query: (data) => ({
        url: "/workitems",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["work-item"] : []),
    }),
    updateManpowerCost: builder.mutation<any, any>({
      query: (data) => ({
        url: "/manpowercost",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    updateMaterialCost: builder.mutation<any, any>({
      query: (data) => ({
        url: "/materialcost",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    updateEquipmentcost: builder.mutation<any, any>({
      query: (data) => ({
        url: "/eqipmentcost",
        method: "put",
        data: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["work-item"] : []),
    }),
    deleteWorkItem: builder.mutation<string, any>({
      query: (data) => ({
        url: "/workitems",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["work-item"] : []),
    }),
    deleteManpowerCost: builder.mutation<string, any>({
      query: (data) => ({
        url: "/manpowercost",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    deleteMaterialCost: builder.mutation<string, any>({
      query: (data) => ({
        url: "/materialcost",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
    deleteEquipmentCost: builder.mutation<string, any>({
      query: (data) => ({
        url: "/equipmentcost",
        method: "delete",
        body: data?.body,
        params: data?.params,
      }),
      invalidatesTags: (result) => (result ? ["cost"] : []),
    }),
  }),
});

export const {
  useGetWorkItemsByScheduleQuery,
  useLazyGetManPowerCostQuery,
  useLazyGetMaterialCostQuery,
  useLazyGetEquipmentCostQuery,
  useCreateWorkItemMutation,
  useCreateManpowerCostMutation,
  useCreateMaterialCostMutation,
  useCreateEquipmentCostMutation,
  useUpdateManpowerCostMutation,
  useUpdateMaterialCostMutation,
  useUpdateEquipmentcostMutation,
  useDeleteManpowerCostMutation,
  useDeleteMaterialCostMutation,
  useDeleteEquipmentCostMutation,
  useUpdateWorkItemMutation,
  useDeleteWorkItemMutation,
} = workItemEndpoints;
