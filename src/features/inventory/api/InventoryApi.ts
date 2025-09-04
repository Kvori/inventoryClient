import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../app/urlConfig";
import { IInventory } from "../types";
import { ITag } from "@/features/tags/types";
import { Authorization } from "@/features/user/consts";

export interface InventoryFormData {
    title: string
    description: string
    categoryId: number
    id: number
    tags: string[]
}

export interface SaveInventorySettingsProps {
    inventoryId: number,
    inventoryData: InventoryFormData,
    tags: ITag[]
}

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['Inventories'],
    endpoints: (build) => ({
        fetchInventory: build.query<IInventory, number>({
            query: (inventoryId) => ({
                url: `/api/inventories/${inventoryId}`,
            }),
            providesTags: (result, error, inventoryId) => [
                { type: 'Inventories', id: `inventory_${inventoryId}` }
            ]
        }),

        fetchUserInventories: build.query<IInventory[], number>({
            query: (userId) => ({
                url: `/api/inventories/user/${userId}`,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: (result, error, userId) => [
                { type: 'Inventories', id: `user_${userId}` }
            ]
        }),

        createInventory: build.mutation<IInventory, number>({
            query: (userId) => ({
                url: `/api/inventories`,
                method: 'POST',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
                body: { userId }
            }),
            invalidatesTags: (result, error, userId) => [
                { type: 'Inventories', id: `user_${userId}` }
            ]
        }),

        deleteInventories: build.mutation<{ message: string }, { inventoryIds: number[], userId: number }>({
            query: ({ inventoryIds, userId }) => ({
                url: `/api/inventories`,
                method: 'DELETE',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
                body: { inventoryIds }
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'Inventories', id: `user_${userId}` }
            ]
        }),

        saveInventorySettings: build.mutation<IInventory, SaveInventorySettingsProps>({
            query: ({ inventoryId, inventoryData, tags }) => ({
                url: `/api/inventories/${inventoryId}/settings`,
                method: 'PUT',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
                body: { inventoryData, tags }
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Inventories', id: `inventory_${inventoryId}` }
            ]
        }),

        updateInventoryFavorite: build.mutation<{ message: string }, { favoriteFlag: boolean, inventoryId: number, userId: number }>({
            query: ({ favoriteFlag, inventoryId }) => ({
                url: `/api/inventories/${inventoryId}/favorite`,
                method: 'PUT',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
                body: { favoriteFlag }
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Inventories', id: `favorites_${inventoryId}` }
            ]
        }),

        checkInventoryFavorite: build.query<{ favoriteFlag: boolean }, number>({
            query: (inventoryId) => ({
                url: `/api/inventories/${inventoryId}/favorite/status`,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: (result, error, inventoryId) => [
                { type: 'Inventories', id: `favorites_${inventoryId}` }
            ]
        }),

        fetchAvailableInventoriesByUser: build.query<IInventory[], number>({
            query: (userId) => ({
                url: `/api/inventories/available/${userId}`,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: (result, error, userId) => [
                { type: 'Inventories', id: `available_${userId}` }
            ]
        }),

    })
});


export const {
    useCreateInventoryMutation,
    useFetchUserInventoriesQuery,
    useFetchInventoryQuery,
    useSaveInventorySettingsMutation,
    useUpdateInventoryFavoriteMutation,
    useCheckInventoryFavoriteQuery,
    useDeleteInventoriesMutation,
    useFetchAvailableInventoriesByUserQuery
} = inventoryApi