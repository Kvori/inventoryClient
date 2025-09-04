import { useParams } from 'react-router-dom'
import {
    useCreateFieldMutation,
    useDeleteFieldMutation,
    useFetchFieldsByInventoryQuery,
    useUpdateFieldMutation,
    useUpdateFieldPositionsMutation,
} from './fieldsApi'
import FieldsDnd from '@/shared/components/FieldsDnd/FieldsDnd'
import { FieldsSelectorOptions } from './consts'
import { Badge, Container } from 'react-bootstrap'

function Fields() {
    const id = Number(useParams().id)

    if (!id) return <div>Error</div>

    const { data: fields } = useFetchFieldsByInventoryQuery(id)
    const [createField, createMeta] = useCreateFieldMutation()
    const [updateField, updateMeta] = useUpdateFieldMutation()
    const [deleteField, deleteMeta] = useDeleteFieldMutation()
    const [updatePositionsFileds, updatePositionsMeta] =
        useUpdateFieldPositionsMutation()

    const anyFieldIsLoading =
        updateMeta.isLoading ||
        createMeta.isLoading ||
        deleteMeta.isLoading ||
        updatePositionsMeta.isLoading

    const anyFieldIsError =
        updateMeta.isError ||
        createMeta.isError ||
        deleteMeta.isError ||
        updatePositionsMeta.isError

    const anyFieldError =
        updateMeta.error ||
        createMeta.error ||
        deleteMeta.error ||
        updatePositionsMeta.error


    if (fields)
        return (
            <Container>
                <h2 className="mb-2">Fields</h2>
                <Badge
                    className="mb-3"
                    bg={`${anyFieldIsLoading || anyFieldIsError
                        ? 'danger'
                        : 'success'
                        }`}
                >
                    {`Fields status: ${anyFieldError ? `Save error` : anyFieldIsLoading ? 'loading' : 'saved'}`}
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
                    fieldsLimit={16}
                    customIdFlag={false}
                />
            </Container>
        )

    return <div>loading...</div>
}

export default Fields
