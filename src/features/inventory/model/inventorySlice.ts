import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInventory } from "../types";

interface InventoryState {
    Inventory: IInventory | null;

}

const initialState: InventoryState = {
    Inventory: null,
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setInventory: (state, action: PayloadAction<IInventory | null>) => {
            state.Inventory = action.payload
        }
    },
})

export const { setInventory } = inventorySlice.actions
const inventoryReducer = inventorySlice.reducer

export default inventoryReducer