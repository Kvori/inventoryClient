import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../app/urlConfig"
import { IField } from "../fields/types"


interface SaveCustomIdProps {
    customId: IField[]
    inventoryId: number
}

interface CreateFieldProps {
    type: string
    inventoryId: number
}

interface ActionsFieldProps {
    customIdData: IField
    inventoryId: number
}

// interface UpdatePositionsProps {
//     inventoryId: number
//     sortedCustomId: IField[]
// }


export const customIdApi = createApi({
    reducerPath: 'customIdApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    tagTypes: ['CustomId'],
    endpoints: (build) => ({
        fetchCustomId: build.query<IField[], number>({
            query: (inventoryId) => ({
                url: `/api/customId/data?id=${inventoryId}`
            }),
            providesTags: (result, error, inventoryId) => [
                { type: 'CustomId', id: inventoryId }
            ]
        }),
        saveCustomId: build.mutation<IField[], SaveCustomIdProps>({
            query: (data) => ({
                url: `/api/customId/save`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'CustomId', id: inventoryId }
            ]
        }),
        createCustomId: build.mutation<IField, CreateFieldProps>({
            query: (data) => ({
                url: `/api/customId/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'CustomId', id: inventoryId }
            ]
        }),
        updateCustomId: build.mutation<IField, ActionsFieldProps>({
            query: (data) => ({
                url: `/api/customId/update`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'CustomId', id: inventoryId }
            ]
        }),
        deleteCustomId: build.mutation<{ message: string }, ActionsFieldProps>({
            query: (data) => ({
                url: `/api/customId/delete`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'CustomId', id: inventoryId }
            ]
        }),
        updatePositionsCustomId: build.mutation<{ message: string }, IField[]>({
            query: (data) => ({
                url: `/api/customId/positions`,
                method: 'POST',
                body: data
            }),
            // invalidatesTags: (result, error, { inventoryId }) => [
            //     { type: 'CustomId', id: inventoryId }
            // ]
        }),
    })
})

export const {
    useFetchCustomIdQuery,
    useSaveCustomIdMutation,
    useCreateCustomIdMutation,
    useUpdateCustomIdMutation,
    useDeleteCustomIdMutation,
    useUpdatePositionsCustomIdMutation
} = customIdApi


export type AppStore = ReturnType<typeof useSaveCustomIdMutation>