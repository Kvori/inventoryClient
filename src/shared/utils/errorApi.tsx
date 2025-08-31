import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AxiosError } from "axios";

function errorApi(error: FetchBaseQueryError | SerializedError) {
    if (error instanceof AxiosError) {
        if (!error.response) {
            return "Error network"
        }

        const message = error.response?.data?.message
        if (!message) return "404 error"
        return message
    }

    return error
}

export default errorApi;