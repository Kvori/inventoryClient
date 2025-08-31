import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FieldsComponentsProps } from './types'
import ReactionButton from '../ReactionButton/ReactionButton'

const FieldsComponents = ({
    field,
    selectorOptions,
    updateField,
    deleteField,
    componentStyle,
    cursorStyle,
    optionsDisabled,
    customIdFlag
}: FieldsComponentsProps) => {
    const { transform, transition, attributes, listeners, setNodeRef } = useSortable({ id: field.id })

    const [inputKey, setInputKey] = useState<'title' | 'value' | undefined>()

    const style: React.CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<Record<string, any>>()

    const watchedType = useWatch({ control, name: 'type' })
    const watchedInput = useWatch({ control, name: inputKey })
    const watchedVisible = useWatch({ control, name: 'visible' })

    const [lastSavedData, setLastSavedData] = useState<Record<string, any>>({})
    const dscrField = selectorOptions.find((option) => option.value === watchedType)?.dscr

    useEffect(() => {
        if (!inputKey) return

        const currentData = {
            type: watchedType,
            [inputKey]: watchedInput,
            visible: watchedVisible ? 1 : 0
        }

        const hasChanged =
            (currentData.type !== lastSavedData.type && currentData.type !== field.type) ||
            (currentData[inputKey] !== lastSavedData[inputKey] && currentData[inputKey] !== field[inputKey]) ||
            (currentData.visible !== lastSavedData.visible && currentData.visible !== field.visible)

        if (hasChanged) {
            onUpdateField({ ...currentData })
            setLastSavedData(currentData)
        }

    }, [watchedType, watchedInput, watchedVisible])

    useEffect(() => {
        const keys = Object.keys(field)
        if (keys.includes('title')) setInputKey('title')
        if (keys.includes('value')) setInputKey('value')
    }, [field])

    useEffect(() => {
        if (inputKey) {
            setValue('type', field.type)
            setValue(inputKey, field[inputKey])
            if (!customIdFlag) {
                setValue('visible', field.visible)
            }
        }
    }, [inputKey])

    const onUpdateField: SubmitHandler<Record<string, any>> = (data) => {
        if (!updateField) return
        updateField.trigger(({ fieldData: { ...data, id: field.id }, inventoryId: field.inventoryId }))
    }

    const onDeleteField = () => {
        if (!deleteField) return
        deleteField.trigger(({ fieldId: field.id, inventoryId: field.inventoryId }))
    }

    return (
        <div ref={setNodeRef} style={style}>
            <Form onSubmit={handleSubmit(onUpdateField)} className="mb-4">
                <Row className="mb-2">
                    <Col xs={3}>
                        <div className="d-flex align-items-center">
                            <div style={{ marginRight: 5, ...cursorStyle }} {...listeners} {...attributes}>
                                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z"
                                        fill="#5C5F62"
                                    />
                                </svg>
                            </div>
                            <Form.Select
                                className="fw-medium"
                                style={componentStyle}
                                {...register('type')}
                            >
                                {selectorOptions.map((option) => (
                                    <option
                                        disabled={optionsDisabled?.some((disabled) => disabled.value === option.value)}
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    {inputKey && (
                        <Col xs={3}>
                            <Form.Control
                                style={componentStyle}
                                placeholder={`Enter ${inputKey}...`}
                                {...register(inputKey)}
                            />
                        </Col>
                    )}
                    <Col xs={1}>
                        <ReactionButton onClick={onDeleteField}>Delete</ReactionButton>
                    </Col>
                    <Col xs={1}>
                        <div className='d-flex align-items-center justify-content-center h-100 gap-2'>
                            <label>Visible</label>
                            <Form.Check
                                {...register('visible')}
                            />
                        </div>
                    </Col>
                </Row>
                {dscrField && (
                    <Row className="text-black-50">
                        <Col>{dscrField}</Col>
                    </Row>
                )}
            </Form>
        </div>
    )
}

export default FieldsComponents
