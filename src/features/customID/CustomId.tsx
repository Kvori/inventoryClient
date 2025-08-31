import { useParams } from "react-router-dom";
import { useCreateCustomIdMutation, useDeleteCustomIdMutation, useFetchCustomIdQuery, useUpdateCustomIdMutation, useUpdatePositionsCustomIdMutation } from "./customIdApi";
import FieldsDnd from "@/shared/components/FieldsDnd/FieldsDnd";
import { CustomIdFieldsSelectorOptions } from "./consts";

function CustomId() {
    const id = Number(useParams().id)

    if (!id) return <div>Error</div>

    const { data: fieldsCustomId, error, isLoading } = useFetchCustomIdQuery(id)
    const [createCustomId] = useCreateCustomIdMutation()
    const [updateCustomId] = useUpdateCustomIdMutation()
    const [deleteCustomId] = useDeleteCustomIdMutation()
    const [updatePositionsFileds] = useUpdatePositionsCustomIdMutation()

    if (fieldsCustomId) return (
        <FieldsDnd
            inventoryId={Number(id)}
            title={"CustomId"}
            fields={fieldsCustomId}
            createField={createCustomId}
            updateField={updateCustomId}
            deleteField={deleteCustomId}
            updatePositionsFileds={updatePositionsFileds}
            createFieldBtnTitle={"Add new CustomId"}
            selectorOptions={CustomIdFieldsSelectorOptions}
            fieldsLimit={10}
            customIdFlag={true}
        />
    );

    return <div>loading...</div>
}

export default CustomId;