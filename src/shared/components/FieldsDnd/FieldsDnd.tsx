import { Container, ListGroup } from 'react-bootstrap'
import FieldsComponents from './FieldsComponents'
import ReactionButton from '../ReactionButton/ReactionButton'
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { IField } from '@/features/fields/types'
import { MutationMeta, SelectorOption } from './types'
import { CustomId } from '@/features/customID/lib/customId'

export interface FieldsDndProps {
    inventoryId: number
    fields: IField[]
    createField: MutationMeta<{ type: string; inventoryId: number }>
    updateField: MutationMeta<{ fieldData: IField; inventoryId: number }>
    deleteField: MutationMeta<{ fieldId: number; inventoryId: number }>
    updatePositionsFileds: (data: IField[]) => { message: string }
    createFieldBtnTitle: string
    selectorOptions: SelectorOption[]
    fieldsLimit: number,
    customIdFlag: boolean
}

function FieldsDnd({
    inventoryId,
    fields,
    createField,
    updateField,
    deleteField,
    updatePositionsFileds,
    createFieldBtnTitle,
    selectorOptions,
    fieldsLimit,
    customIdFlag
}: FieldsDndProps) {
    const [dragFields, setDragFields] = useState<IField[]>([])
    const [activeFieldId, setActiveFieldId] = useState<number | null>(null)
    const [optionsDisabled, setOptionsDisabled] = useState<SelectorOption[]>([])
    const [errorCreate, setErrorCreate] = useState<string | undefined>()

    useEffect(() => {
        setDragFields(fields.map((field) => ({ ...field })).sort((a, b) => a.position - b.position))
        setOptionsDisabled(optionsDisabledCreate(fields))
    }, [fields])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const [testId, setTestId] = useState()

    useEffect(() => {
        if (customIdFlag) {
            const test = CustomId.create(inventoryId, 1, fields)
            setTestId(test)
        }
    }, [CustomId])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        if (active.id !== over.id) {
            setDragFields((prevFields) => {
                const oldIndex = prevFields.findIndex((field) => field.id === active.id)
                const newIndex = prevFields.findIndex((field) => field.id === over.id)     

                updatePositionsFileds({sortedFields: arrayMove(prevFields, oldIndex, newIndex), inventoryId})
                return arrayMove(prevFields, oldIndex, newIndex)
            })

        }

        setActiveFieldId(null)
    }

    const onDragStartField = (event: DragStartEvent) => {
        setActiveFieldId(Number(event.active.id))
    }

    const optionsDisabledCreate = (fields: IField[]): SelectorOption[] => {
        return selectorOptions.filter((option) => {
            if (!option.limit) return false
            const count = fields.filter((field) => field.type === option.value).length
            return count >= option.limit
        })
    }

    const availableType = (disabled: SelectorOption[]): string => {
        const available = selectorOptions.find(
            (option) => !disabled.some((el) => el.value === option.value)
        )
        if (!available) throw new Error('Cant create item, type limit exceeded')
        return available.value
    }

    const onCreate = () => {
        try {
            const type = availableType(optionsDisabled)
            createField.trigger(({ type, inventoryId }))
            setErrorCreate(undefined)
        } catch (e) {
            if (e instanceof Error) {
                setErrorCreate(e.message)
            } else {
                setErrorCreate('Unknown error')
            }
        }
    }

    const styleOverlay: React.CSSProperties = {
        borderColor: '#86b7fe',
        boxShadow: '0 0 0 .25rem rgba(13, 110, 253, .25)',
    }

    return (
        <Container>
            {customIdFlag && <div>{'CustomId example: ' + testId}</div>}
            <ListGroup className="mb-3 content">
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    onDragStart={onDragStartField}
                >
                    <SortableContext
                        items={dragFields.map((field) => field.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {dragFields.map((field) => (
                            <FieldsComponents
                                key={field.id}
                                field={field}
                                selectorOptions={selectorOptions}
                                updateField={updateField}
                                deleteField={deleteField}
                                cursorStyle={{ cursor: 'grab' }}
                                optionsDisabled={optionsDisabled}
                                customIdFlag={customIdFlag}
                            />
                        ))}
                    </SortableContext>
                    {activeFieldId !== null && (
                        <DragOverlay>
                            <FieldsComponents
                                field={dragFields.find((field) => field.id === activeFieldId)!}
                                selectorOptions={selectorOptions}
                                componentStyle={styleOverlay}
                                cursorStyle={{ cursor: 'grabbing' }}
                            />
                        </DragOverlay>
                    )}
                </DndContext>
            </ListGroup>
            {dragFields.length < fieldsLimit && (
                <>
                    <ReactionButton isLoading={createField.isLoading} disabled={!!errorCreate} onClick={onCreate}>
                        {createFieldBtnTitle}
                    </ReactionButton>
                    {errorCreate && (
                        <div className="text-danger" style={{ marginTop: 5 }}>
                            {errorCreate}
                        </div>
                    )}
                </>
            )}
        </Container>
    )
}

export default FieldsDnd
