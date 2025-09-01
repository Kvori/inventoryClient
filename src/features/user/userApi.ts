import { BASE_URL } from '@/app/urlConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../user/types'
import { Authorization } from './consts'

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
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        login: build.mutation<{token: string, user: IUser}, LoginProps>({
            query: (data) => ({
                url: `/api/users/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: build.mutation<{token: string, user: IUser}, RegisterProps>({
            query: (data) => ({
                url: `/api/users/registration`,
                method: 'POST',
                body: data,
            }),
        }),
        check: build.query<{token: string, user: IUser}, void>({
            query: () => ({
                url: `/api/users/auth`,
                headers: Authorization
            }),
        }),
        fetchUser: build.query<IUser, number>({
            query: (userId) => ({
                url: `/api/users/user?id=${userId}`
            })
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useCheckQuery, useFetchUserQuery } = userApi

