import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../app/urlConfig";
import { IInventory } from "../types";
import { ITag } from "@/features/tags/types";

export interface InventoryFormData {
    title: string
    description: string
    categoryId: number
    id: number
    tags: string[]
}

export interface SaveInventorySettingsProps {
    inventoryId: number,
    inventory: InventoryFormData,
    tags: ITag[]
}

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'
    }),
    tagTypes: ['Inventories'],
    endpoints: (build) => ({
        fetchInventory: build.query<IInventory, number>({
            query: (inventoryId) => ({
                url: `/api/inventories/inventory?id=${inventoryId}`
            }),
            providesTags: (result, error, inventoryId) => [
                { type: 'Inventories', id: `inventory_${inventoryId}` }
            ]
        }),
        fetchUserInventories: build.query<IInventory[], number>({
            query: (userId) => ({
                url: `/api/inventories/user?id=${userId}`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }),
            providesTags: (result, error, userId) => [
                { type: 'Inventories', id: `user_${userId}` }
            ]
        }),
        createInventory: build.mutation<IInventory, number>({
            query: (userId) => ({
                url: `/api/inventories/create`,
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: { userId }
            }),
            invalidatesTags: (result, error, userId) => [
                { type: 'Inventories', id: `user_${userId}` }
            ]
        }),
        saveInventorySettings: build.mutation<IInventory, SaveInventorySettingsProps>({
            query: ({ inventoryId, inventory, tags }) => ({
                url: `/api/inventories/save`,
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: { inventoryId, inventory, tags }
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Inventories', id: `inventory_${inventoryId}` }
            ]
        }),
    })
})

export const { useCreateInventoryMutation, useFetchUserInventoriesQuery, useFetchInventoryQuery, useSaveInventorySettingsMutation } = inventoryApi