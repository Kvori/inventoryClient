import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../app/urlConfig";
import { IField } from "./types";
import { Authorization } from "../user/consts";

interface SaveFieldsProps {
  fields: IField[];
  inventoryId: number;
}

interface CreateFieldProps {
  type: string;
  inventoryId: number;
}

interface UpdateFieldProps {
  fieldData: IField;
  inventoryId: number;
  fieldId: number;
}

interface DeleteFieldProps {
  inventoryId: number;
  fieldId: number;
}

interface UpdatePositionsProps {
  sortedFields: IField[];
  inventoryId: number;
}

export const fieldsApi = createApi({
  reducerPath: "fieldsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Fields"],
  endpoints: (build) => ({
    fetchFieldsByInventory: build.query<IField[], number>({
      query: (inventoryId) => ({
        url: `/api/fields/inventory/${inventoryId}`,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
      }),
      providesTags: (result, error, inventoryId) => [
        { type: "Fields", id: inventoryId },
      ],
    }),

    saveFields: build.mutation<{ message: string }, SaveFieldsProps>({
      query: ({ fields, inventoryId }) => ({
        url: `/api/fields/save`,
        method: "PUT",
        body: { fields, inventoryId },
        headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
      }),
      invalidatesTags: (result, error, { inventoryId }) => [
        { type: "Fields", id: inventoryId },
      ],
    }),

    createField: build.mutation<IField, CreateFieldProps>({
      query: ({ type, inventoryId }) => ({
        url: `/api/fields`,
        method: "POST",
        body: { type, inventoryId },
        headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
      }),
      invalidatesTags: (result, error, { inventoryId }) => [
        { type: "Fields", id: inventoryId },
      ],
    }),

    updateField: build.mutation<IField, UpdateFieldProps>({
      query: ({ fieldData, inventoryId, fieldId }) => ({
        url: `/api/fields/${fieldId}`,
        method: "PUT",
        body: { fieldData, inventoryId },
        headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
      }),
      invalidatesTags: (result, error, { inventoryId }) => [
        { type: "Fields", id: inventoryId },
      ],
    }),

    deleteField: build.mutation<{ message: string }, DeleteFieldProps>({
      query: ({ fieldId, inventoryId }) => ({
        url: `/api/fields/${fieldId}`,
        method: "DELETE",
        body: { inventoryId },
        headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
      }),
      invalidatesTags: (result, error, { inventoryId }) => [
        { type: "Fields", id: inventoryId },
      ],
    }),

    updateFieldPositions: build.mutation<{ message: string }, UpdatePositionsProps>({
      query: ({ sortedFields }) => ({
        url: `/api/fields/positions`,
        method: "PUT",
        body: sortedFields,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}`},
      }),
      invalidatesTags: (result, error, { inventoryId }) => [
        { type: "Fields", id: inventoryId },
      ],
    }),
  }),
});

export const {
  useFetchFieldsByInventoryQuery,
  useSaveFieldsMutation,
  useCreateFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation,
  useUpdateFieldPositionsMutation,
} = fieldsApi;
