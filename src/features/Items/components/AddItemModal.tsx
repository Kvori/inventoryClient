import { FieldsType, IField } from '@/features/fields/types'
import FormField from '@/shared/components/FormField/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { IItem, IItemValue } from '../types'
import { useEffect, useState } from 'react'
import ReactionButton from '@/shared/components/ReactionButton/ReactionButton'
import { useCreateItemMutation, useUpdateItemMutation } from '../itemsApi'

interface AddItemModalProps {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    fields: IField[]
    inventoryId: number
    mode: 'create' | 'update'
    itemData: IItem | null
}

const getSchema = (fields: IField[]) => {
    const shape: Record<string, z.ZodTypeAny> = {}

    fields.forEach((field) => {
        const key = `${field.id}_${field.title}`
        shape[key] =
            field.type === FieldsType.checkbox ? z.boolean() : z.string()
    })

    return z.object(shape)
}

function AddItemModal({
    show,
    setShow,
    fields,
    inventoryId,
    mode,
    itemData,
}: AddItemModalProps) {
    const [sortedFields, setSortedFields] = useState<IField[]>([])
    const [localError, setLocalError] = useState<string | null>(null)

    const [createItem, createMeta] = useCreateItemMutation()
    const [updateItem, updateMeta] = useUpdateItemMutation()

    const mutation =
        mode === 'create'
            ? { trigger: createItem, meta: createMeta }
            : { trigger: updateItem, meta: updateMeta }

    useEffect(() => {
        setSortedFields([...fields].sort((a, b) => a.position - b.position))
    }, [fields])

    const schema = getSchema(fields)
    type FormProps = z.infer<typeof schema>

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormProps>({ resolver: zodResolver(schema) })

    useEffect(() => {
        if (mode === 'create') {
            reset()
        }
    }, [show])
    
    useEffect(() => {
        reset()
    }, [itemData])

    useEffect(() => {
        if (!itemData || sortedFields.length === 0) return

        const valueMap = new Map<number, string | boolean>()
        itemData.itemValues.forEach(({ fieldId, value }) => {
            valueMap.set(fieldId, value)
        })

        sortedFields.forEach((field) => {
            const key = `${field.id}_${field.title}`
            const value = valueMap.get(field.id)
            if (value !== undefined) {
                setValue(key, value)
            }
        })
    }, [itemData, sortedFields])

    const handleClose = () => {
        setShow(false)
        setLocalError(null)
    }

    const onSubmit = async (data: FormProps) => {
        const itemValues: IItemValue[] = fields.map((field) => {
            const key = `${field.id}_${field.title}`
            return {
                value: data[key],
                fieldId: Number(field.id),
            }
        })

        try {
            await mutation
                .trigger({ itemValues, inventoryId, itemId: itemData?.id })
                .unwrap()
            setShow(false)
            setLocalError(null)
        } catch (e: any) {
            setLocalError(e?.data?.message || 'Ошибка при сохранении')
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === 'create'
                        ? 'Добавить элемент'
                        : 'Редактировать элемент'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Form id="itemsForm" onSubmit={handleSubmit(onSubmit)}>
                    {sortedFields.map((field) => {
                        const key = `${field.id}_${field.title}`
                        return (
                            <FormField
                                key={field.id}
                                name={field.title}
                                className="fw-bold mb-3"
                                errorMessage={errors[key]?.message}
                            >
                                {field.type === FieldsType.textarea ? (
                                    <Form.Control
                                        as="textarea"
                                        {...register(key)}
                                    />
                                ) : field.type === FieldsType.checkbox ? (
                                    <Form.Check
                                        type="checkbox"
                                        {...register(key)}
                                    />
                                ) : (
                                    <Form.Control
                                        type={field.type}
                                        {...register(key)}
                                        isInvalid={!!errors[key]}
                                    />
                                )}
                            </FormField>
                        )
                    })}
                </Form>
                {localError && (
                    <p className="text-danger text-center mt-3">{localError}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <ReactionButton
                    isLoading={mutation.meta.isLoading}
                    variant="primary"
                    type="submit"
                    form="itemsForm"
                >
                    Save
                </ReactionButton>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddItemModal
