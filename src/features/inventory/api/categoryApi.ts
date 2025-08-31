import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICategory } from "../types"
import { BASE_URL } from "@/shared/utils/urlConfig"

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        fetchCategories: build.query<ICategory[], void>({
            query: () => ({
                url: `/api/categories/data`
            })
        })
    })
})

export const { useFetchCategoriesQuery } = categoriesApi