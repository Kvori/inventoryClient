import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../shared/utils/urlConfig"
import { IField } from "./types"


interface SaveFieldsProps {
    fields: IField[]
    inventoryId: number
}

interface CreateFieldProps {
    type: string
    inventoryId: number
}

interface ActionsFieldProps {
    fieldData: IField
    inventoryId: number
}


export const fieldsApi = createApi({
    reducerPath: 'fieldsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    tagTypes: ['Fields'],
    endpoints: (build) => ({
        fetchFields: build.query<IField[], number>({
            query: (inventoryId) => ({
                url: `/api/fields/data?id=${inventoryId}`
            }),
            providesTags: (result, error, inventoryId) => [
                { type: 'Fields', id: inventoryId }
            ]
        }),
        saveFields: build.mutation<IField[], SaveFieldsProps>({
            query: (data) => ({
                url: `/api/fields/save`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Fields', id: inventoryId }
            ]
        }),
        createField: build.mutation<IField, CreateFieldProps>({
            query: (data) => ({
                url: `/api/fields/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Fields', id: inventoryId }
            ]
        }),
        updateField: build.mutation<IField, ActionsFieldProps>({
            query: (data) => ({
                url: `/api/fields/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Fields', id: inventoryId }
            ]
        }),
        deleteField: build.mutation<{ message: string }, ActionsFieldProps>({
            query: (data) => ({
                url: `/api/fields/delete`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Fields', id: inventoryId }
            ]
        }),
        updatePositionsField: build.mutation<{ message: string }, {sortedFields: IField[], inventoryId: number}>({
            query: ({sortedFields, inventoryId}) => ({
                url: `/api/fields/positions`,
                method: 'PUT',
                body: sortedFields
            }),
            invalidatesTags: (result, error, { inventoryId }) => [
                { type: 'Fields', id: inventoryId }
            ]
        }),
    })
})

export const {
    useFetchFieldsQuery,
    useSaveFieldsMutation,
    useCreateFieldMutation,
    useUpdateFieldMutation,
    useDeleteFieldMutation,
    useUpdatePositionsFieldMutation
} = fieldsApi
