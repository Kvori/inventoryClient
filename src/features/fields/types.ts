export interface IField {
    inventoryId: number
    id: number | string
    title: string
    type: string
    width: number
    newFlag?: boolean
    position: number,
    visible?: boolean
}

export enum FieldsType {
    text = 'text',
    textarea = 'textarea',
    number = 'number',
    url = 'url',
    checkbox = 'checkbox'
}
