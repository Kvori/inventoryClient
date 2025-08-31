import { customIdApi } from "@/features/customID/customIdApi"
import { fieldsApi } from "@/features/fields/fieldsApi"
import { categoriesApi } from "@/features/inventory/api/categoryApi"
import { inventoryApi } from "@/features/inventory/api/InventoryApi"
import inventoryReducer from "@/features/inventory/model/inventorySlice"
import { itemsApi } from "@/features/Items/itemsApi"
import { tagsApi } from "@/features/tags/tagsApi"
import userReducer from "@/features/user/model/userSlice"
import { userApi } from "@/features/user/userApi"
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    userReducer,
    inventoryReducer,
    [fieldsApi.reducerPath]: fieldsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [customIdApi.reducerPath]: customIdApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(fieldsApi.middleware)
                .concat(categoriesApi.middleware)
                .concat(userApi.middleware)
                .concat(tagsApi.middleware)
                .concat(inventoryApi.middleware)
                .concat(itemsApi.middleware)
                .concat(customIdApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
