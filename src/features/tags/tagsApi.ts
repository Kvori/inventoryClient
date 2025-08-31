import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../shared/utils/urlConfig";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const tagsApi = createApi({
    reducerPath: 'tagsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    endpoints: (build) => ({
        fetchTagsByPrefix: build.query<string[], string>({
            query: (prefix) => ({
                url: `api/tags/filter?prefix=${prefix}`
            })
        })
    })
})

export const { useLazyFetchTagsByPrefixQuery } = tagsApi