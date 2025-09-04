import { Container, Form, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteItemMutation, useFetchItemsQuery } from '../itemsApi'
import ReactionButton from '@/shared/components/ReactionButton/ReactionButton'
import { useEffect, useRef, useState } from 'react'
import routes from '@/app/config/routesConfig'
import { IField } from '@/features/fields/types'
import { useForm } from 'react-hook-form'
import { IItem } from '../types'
import AddItemModal from './AddItemModal'
import { DefaultFields, DefaultFieldsValue } from '../consts'
import MarkDownComponent from './MarkDownComponent'
import { useFetchFieldsByInventoryQuery } from '@/features/fields/fieldsApi'

type FormValues = {
    [itemId: number]: boolean
}

function Items() {
    const { id } = useParams()
    const inventoryId = Number(id)
    const navigate = useNavigate()

    if (!inventoryId) navigate(routes.main.home)

    const { data: fields } = useFetchFieldsByInventoryQuery(inventoryId)
    const { data: items } = useFetchItemsQuery(inventoryId)
    const [deleteItem, { isLoading }] = useDeleteItemMutation()

    const [show, setShow] = useState(false)
    const [mode, setMode] = useState<'create' | 'update'>('create')
    const [itemData, setItemData] = useState<IItem | null>(null)

    const onAddItem = () => {
        setMode('create')
        setItemData(null)
        setShow(true)
    }

    const onRedactedItem = () => {
        const itemIds = Object.entries(watchedValues)
            .filter(([_, value]) => value === true)
            .map(([key]) => key)
        const item = sortedItems?.find((el) => el.id === Number(itemIds[0]))
        if (item) {
            setMode('update')
            setItemData(item)
            setShow(true)
        }
    }

    const { register, handleSubmit, setValue, getValues, watch, reset } =
        useForm<FormValues>()

    const watchedValues = watch()

    const onDeleteItem = (data: FormValues) => {
        const itemIds = Object.entries(data)
            .filter(([_, value]) => value === true)
            .map(([key]) => key)

        deleteItem({ itemIds, inventoryId })
    }

    const [sortedFields, setSortedFields] = useState<IField[]>([])

    useEffect(() => {
        if (fields) {
            setSortedFields([...fields].sort((a, b) => a.position - b.position))
        }
    }, [fields])

    const [sortedItems, setSortedItems] = useState<IItem[]>()
    const [rowPositions, setRowPositions] = useState<
        { id: number; top: number }[] | null
    >(null)

    const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});

    const [selectAllItems, setSelectAllItems] = useState(false)

    useEffect(() => {
        reset()
        setSelectAllItems(false)
        rowRefs.current = {}
        setRowPositions(null)
        if (items) {
            setSortedItems([...items].sort((a, b) => a.id - b.id))
        }
    }, [items])

    useEffect(() => {
        if (sortedItems) {
            const positions = sortedItems.map((item) => {
                const el = rowRefs.current[item.id]
                return {
                    id: item.id,
                    top: el?.offsetTop ?? 0,
                }
            })
            setRowPositions(positions)
        }
    }, [sortedItems])

    const [editState, setEditState] = useState(false)

    useEffect(() => {
        const selected = Object.values(watchedValues).filter(Boolean)
        setEditState(selected.length > 1 || selected.length === 0)
    }, [watchedValues])

    useEffect(() => {
        if (!sortedItems) return

        const isAllChecked = selectAllItems === true

        sortedItems.forEach((item) => {
            setValue(item.id, isAllChecked)
        })
    }, [selectAllItems])

    const onClickItem = (itemId) => {
        setValue(itemId, !getValues()[itemId])
    }

    if (sortedItems && items) {
        return (
            <Container className="p-0">
                <AddItemModal
                    show={show}
                    setShow={setShow}
                    fields={sortedFields}
                    inventoryId={inventoryId}
                    mode={mode}
                    itemData={itemData}
                />
                <div className="d-flex flex-column mb-3">
                    <div className='d-flex gap-3'>
                        <ReactionButton disabled={sortedFields.length === 0} onClick={onAddItem}>
                            Add Item
                        </ReactionButton>
                        <Form onSubmit={handleSubmit(onDeleteItem)}>
                            <ReactionButton isLoading={isLoading} type="submit">
                                Delete
                            </ReactionButton>
                        </Form>
                        <ReactionButton
                            disabled={editState}
                            onClick={onRedactedItem}
                        >
                            Edit
                        </ReactionButton>
                    </div>
                    {sortedFields.length === 0 &&
                        <span className="text-danger">
                            The inventory is not configured, there are no fields to fill in.
                        </span>}
                </div>
                <div className="position-relative">
                    <Table className="m-0" bordered responsive>
                        <thead>
                            <tr>
                                {DefaultFields.map((field) => (
                                    <th
                                        className="text-nowrap"
                                        key={field.title}
                                        style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}
                                    >
                                        {field.title}
                                    </th>
                                ))}
                                {sortedFields.map((field) => {
                                    if (!field.visible) return
                                    return (
                                        <th
                                            className="text-nowrap"
                                            key={field.id}
                                            style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            {field.title}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems.map((item) => (
                                <tr
                                    style={{ cursor: 'pointer' }}
                                    key={item.id}
                                    ref={(el) => {
                                        rowRefs.current[item.id] = el;
                                    }}
                                    onClick={() => onClickItem(item.id)}
                                >
                                    {DefaultFields.map((field) => {
                                        let value = item[field.value]
                                        if (field.value === DefaultFieldsValue.createdAt) {
                                            const date = new Date(
                                                item[field.value]
                                            )
                                            value =
                                                String(date.getDate()) +
                                                '.' +
                                                (date.getMonth() + 1 < 10
                                                    ? `0${String(
                                                        date.getMonth() + 1
                                                    )}`
                                                    : String(
                                                        date.getMonth() + 1
                                                    )) +
                                                '.' +
                                                String(date.getFullYear())
                                        }
                                        return (
                                            <td
                                                key={field.title}
                                                className={`text-nowrap text-center`}
                                            >
                                                {value}
                                            </td>
                                        )
                                    })}
                                    {sortedFields.map((field) => {
                                        if (!field.visible) return
                                        const itemValue = item.itemValues?.find(
                                            (el) => el.fieldId === field.id
                                        )?.value
                                        return (
                                            <td
                                                key={field.id}
                                                className={`text-nowrap text-center`}
                                            >
                                                <MarkDownComponent
                                                    type={field.type}
                                                    itemValue={itemValue}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {sortedItems.length === 0 &&
                        <div
                            className="w-100 border-1 d-flex align-items-center justify-content-center text-black-50"
                            style={{ border: "1px solid #dee2e6", height: 150 }}
                        >
                            The list of items in the inventory is empty
                        </div>}
                    {rowPositions &&
                        sortedItems &&
                        rowPositions.map((el, index) => {
                            return (
                                <div key={el.top}>
                                    {index === 0 && (
                                        <div
                                            className="position-absolute"
                                            style={{ top: 10, left: -30 }}
                                        >
                                            <Form.Check
                                                value={selectAllItems}
                                                onChange={() =>
                                                    setSelectAllItems(
                                                        !selectAllItems
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                    <div
                                        className="position-absolute"
                                        style={{ top: el.top + 10, left: -30 }}
                                    >
                                        <Form.Check
                                            {...register(sortedItems[index].id)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </Container>
        )
    }

}

export default Items
