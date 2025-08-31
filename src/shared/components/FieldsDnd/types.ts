import { IField } from '@/features/fields/types'

export interface SelectorOption {
    value: string
    title: string
    dscr?: string
    limit?: number
}

export interface MutationMeta<TArgs = any> {
  trigger: (args: TArgs) => void
  isLoading?: boolean
  isError?: boolean
  error?: unknown
}

export interface FieldsComponentsProps {
  field: IField
  selectorOptions: SelectorOption[]
  updateField: MutationMeta<{ fieldData: IField; inventoryId: number }>
  deleteField: MutationMeta<{ fieldId: number; inventoryId: number }>
  componentStyle?: React.CSSProperties
  cursorStyle?: React.CSSProperties
  optionsDisabled?: SelectorOption[]
  customIdFlag: boolean
}
