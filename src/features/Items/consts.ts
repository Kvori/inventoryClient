export enum DefaultFieldsValue {
    creator = 'creator',
    createdAt = 'createdAt',
    customId = 'id',
}

interface IDefaultField {
    title: string,
    value: DefaultFieldsValue
}

export const DefaultFields: IDefaultField[] = [
    {
        title: 'Created by',
        value: DefaultFieldsValue.creator,
    },
    {
        title: 'Created at',
        value: DefaultFieldsValue.createdAt,
    },
    {
        title: 'Custom id',
        value: DefaultFieldsValue.customId,
    },
]
