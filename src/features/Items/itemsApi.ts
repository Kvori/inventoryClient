import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../shared/utils/urlConfig"
import { IItem, IItemValue } from "./types"

interface CreateItemProps {
    itemValues: IItemValue[],
    inventoryId: number
}

interface DeleteItemProps {
    itemIds: string[],
    inventoryId: number
}

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    tagTypes: ['Items'],
    endpoints: (build) => ({
        fetchItems: build.query<IItem[], number>({
            query: (inventoryId) => ({
                url: `/api/items/inventory?inventoryId=${inventoryId}`
            }),
            providesTags: (result, error, inventoryId) => [
                { type: 'Items', id: `inventory_${inventoryId}` }
            ]
        }),
        fetchItem: build.query<IItem[], { itemId: number }>({
            query: (itemId) => ({
                url: `/api/items/item?itemId=${itemId}`
            }),
            providesTags: (result, error, itemId) => [
                { type: 'Items', id: `item_${itemId}` }
            ]
        }),
        createItem: build.mutation<IItem, CreateItemProps>({
            query: (data) => ({
                url: `/api/items/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => {
                if (result) {
                    return [{ type: 'Items', id: `inventory_${inventoryId}` }]
                }
                return []
            }
        }),
        deleteItem: build.mutation<void, DeleteItemProps>({
            query: ({ itemIds, inventoryId }) => ({
                url: `/api/items/delete?id=${itemIds.join('&id=')}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { inventoryId }) => {
                if (result) {
                    return [{ type: 'Items', id: `inventory_${inventoryId}` }]
                }
                return []
            }
        }),
        updateItem: build.mutation<IItem, {itemValues: IItemValue[], inventoryId: number, itemId: number}>({
            query: (data) => ({
                url: `/api/items/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => {
                if (result) {
                    return [{ type: 'Items', id: `inventory_${inventoryId}` }]
                }
                return []
            }
        }),
    })
})

export const {
    useFetchItemsQuery,
    useCreateItemMutation,
    useDeleteItemMutation,
    useLazyFetchItemQuery,
    useUpdateItemMutation
} = itemsApi
