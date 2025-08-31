import { BASE_URL } from '@/app/urlConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../user/types'

interface LoginProps {
    email: string
    password: string
}

interface RegisterProps {
    name: string
    email: string
    password: string
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        login: build.mutation<IUser, LoginProps>({
            query: (data) => ({
                url: `/api/users/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: build.mutation<IUser, RegisterProps>({
            query: (data) => ({
                url: `/api/users/registration`,
                method: 'POST',
                body: data,
            }),
        }),
        check: build.query<IUser, void>({
            query: () => ({
                url: `/api/users/auth`,
            }),
        }),
        logout: build.mutation<{message: string}, void>({
            query: () => ({
                url: `/api/users/logout`,
                method: 'POST'
            }),
        }),
        fetchUser: build.query<IUser, number>({
            query: (userId) => ({
                url: `/api/users/user?id=${userId}`
            })
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useCheckQuery, useFetchUserQuery, useLogoutMutation } = userApi

