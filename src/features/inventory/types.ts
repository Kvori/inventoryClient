import { ITag } from "../tags/types";

export interface ICategory {
    id: number,
    title: string,
}

export interface IInventory {
    id: number,
    title: string,
    description: string,
    userId: number,
    categoryId: number,
    tags: ITag[]
}