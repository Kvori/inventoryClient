import { useParams } from 'react-router-dom'
import {
    useCreateFieldMutation,
    useDeleteFieldMutation,
    useFetchFieldsQuery,
    useUpdateFieldMutation,
    useUpdatePositionsFieldMutation,
} from './fieldsApi'
import FieldsDnd from '@/shared/components/FieldsDnd/FieldsDnd'
import { FieldsSelectorOptions } from './consts'
import { Badge, Container } from 'react-bootstrap'

function Fields() {
    const id = Number(useParams().id)

    if (!id) return <div>Error</div>

    const { data: fields } = useFetchFieldsQuery(id)
    const [createField, createMeta] = useCreateFieldMutation()
    const [updateField, updateMeta] = useUpdateFieldMutation()
    const [deleteField, deleteMeta] = useDeleteFieldMutation()
    const [updatePositionsFileds, updatePositionsMeta] =
        useUpdatePositionsFieldMutation()

    const statusOfAllFieldsActions = updateMeta.isLoading ||
        updateMeta.isError ||
        createMeta.isLoading ||
        createMeta.isError ||
        deleteMeta.isLoading ||
        deleteMeta.isError ||
        updatePositionsMeta.isLoading ||
        updatePositionsMeta.isError

    if (fields)
        return (
            <Container>
                <h2 className="mb-2">Fields</h2>
                <Badge
                    className="mb-3"
                    bg={`${statusOfAllFieldsActions
                            ? 'danger'
                            : 'success'
                        }`}
                >
                    {`Fields status: ${statusOfAllFieldsActions ? 'loading' : 'saved'
                        }`}
                </Badge>
                <FieldsDnd
                    inventoryId={Number(id)}
                    fields={fields}
                    createField={{ trigger: createField, ...createMeta }}
                    updateField={{ trigger: updateField, ...updateMeta }}
                    deleteField={{ trigger: deleteField, ...deleteMeta }}
                    updatePositionsFileds={updatePositionsFileds}
                    createFieldBtnTitle={'Add new field'}
                    selectorOptions={FieldsSelectorOptions}
                    fieldsLimit={15}
                    customIdFlag={false}
                />
            </Container>
        )

    return <div>loading...</div>
}

export default Fields
