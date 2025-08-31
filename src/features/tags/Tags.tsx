import AsyncCreatableSelect from "react-select/async-creatable";
import { useLazyFetchTagsByPrefixQuery } from "./tagsApi";
import { useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { ITag } from "./types";

interface TagsProps {
    tags: ITag[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

function Tags({ tags, setTags }: TagsProps) {
    const [triggerFetchTags] = useLazyFetchTagsByPrefixQuery();

    const mappedTags = useMemo(() => {
        return tags.map(tag => ({
            label: tag.title,
            value: tag.title
        }));
    }, [tags]);

    const loadOptions = useCallback(async (inputValue: string) => {
        if (!inputValue) return [];

        const result = await triggerFetchTags(inputValue);
        const fetchedTags = result.data ?? [];

        return fetchedTags.map(tag => ({
            label: tag.title,
            value: tag.title
        }));
    }, [triggerFetchTags]);

    const debouncedLoadOptions = useMemo(() => {
        return debounce(
            (inputValue: string, callback: (options: { label: string; value: string }[]) => void) => {
                loadOptions(inputValue).then(callback);
            },
            500
        );
    }, [loadOptions]);

    return (
        <AsyncCreatableSelect
            defaultValue={mappedTags}
            isClearable
            isMulti
            onKeyDown={e => {
                if (e.key === " " || e.code === "Space") return e.preventDefault();
            }}
            onChange={(value) => setTags(value.map(el => el.value))}
            loadOptions={debouncedLoadOptions}
        />
    );
}

export default Tags;