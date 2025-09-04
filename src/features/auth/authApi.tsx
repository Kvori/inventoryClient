// import { BASE_URL } from '@/shared/utils/urlConfig'
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { IUser } from '../user/types'

// interface LoginProps {
//     email: string
//     password: string
// }

// interface RegisterProps {
//     name: string
//     email: string
//     password: string
// }

// interface AuthResProps {
//     token: string
//     user: IUser
// }

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         credentials: 'include'
//     }),
//     tagTypes: ['Auth'],
//     endpoints: (build) => ({
//         login: build.mutation<AuthResProps, LoginProps>({
//             query: (data) => ({
//                 url: `/api/users/login`,
//                 method: 'POST',
//                 body: data,
//             }),
//         }),
//         register: build.mutation<AuthResProps, RegisterProps>({
//             query: (data) => ({
//                 url: `/api/users/registration`,
//                 method: 'POST',
//                 body: data,
//             }),
//         }),
//         check: build.query<IUser, void>({
//             query: () => ({
//                 url: `/api/users/auth`,
//             }),
//         }),
//     }),
// })

// export const { useLoginMutation, useRegisterMutation, useCheckQuery } = authApi
