import { FieldsType } from "@/features/fields/types";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

function MarkDownComponent({ type, itemValue }: {type: string, itemValue: string}) {
    if (type === FieldsType.textarea) {
        return (
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                {itemValue}
            </ReactMarkdown>
        )
    } else {
        return typeof itemValue === 'boolean'
            ? itemValue
                ? 'Yes'
                : 'No'
            : itemValue || '-'
    }
}

export default MarkDownComponent;