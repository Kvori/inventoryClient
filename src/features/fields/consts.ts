import { FieldsType } from "./types"

export const selectorsConfig = ['text', 'number', 'date', 'email', 'tel', 'time']

export const FieldsSelectorOptions = [
    {
        value: FieldsType.text,
        title: 'Single-line text field',
        dscr: 'You can add up to 3 single-line text fields.',
        limit: 3
    },
    {
        value: FieldsType.textarea,
        title: 'Multi-line text field',
        dscr: 'You can add up to 3 multi-line text fields.',
        limit: 3
    },
    {
        value: FieldsType.number,
        title: 'Numeric field',
        dscr: 'You can add up to 3 numeric fields.',
        limit: 3
    },
    {
        value: FieldsType.url,
        title: 'Document/image field',
        dscr: 'You can add up to 3 document/image fields (entered as a link).',
        limit: 3
    },
    {
        value: FieldsType.checkbox,
        title: 'True/false field field',
        dscr: 'You can add up to 3 true/false fields (displayed as checkboxes).',
        limit: 3
    },
]