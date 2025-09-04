import { Container, FloatingLabel, Form } from 'react-bootstrap'
import FormField from '../../shared/components/FormField/FormField'
import ReactionButton from '../../shared/components/ReactionButton/ReactionButton'
import { useEffect, useState } from 'react'
import Tags from '../tags/Tags'
import { useFetchCategoriesQuery } from '../inventory/api/categoryApi'
import { InventoryFormData, useSaveInventorySettingsMutation } from '../inventory/api/InventoryApi'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '@/app/hooks/redux'

function Settings() {
    const { data: categories } = useFetchCategoriesQuery()
    const [saveInventorySettings, {isLoading, isError, error}] = useSaveInventorySettingsMutation()

    const inventory = useAppSelector(state => state.inventoryReducer.Inventory)

    const [selected, setSelected] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<InventoryFormData>()

    useEffect(() => {
        if (inventory) {            
            setValue('title', inventory.title)
            setValue('description', inventory.description)
            setValue('categoryId', inventory.categoryId)
            setValue('id', inventory.id)
            setSelected(inventory.tags.map(tag => tag.title))
        }
    }, [inventory])

    if (inventory) {
        const onSave = (data: InventoryFormData) => {
            saveInventorySettings({ inventoryId: inventory.id, inventoryData: data, tags: selected.map(tag => ({ title: tag })) })
        }
        return (
            <Container>
                <h2>Settings</h2>
                <Form onSubmit={handleSubmit(onSave)}>
                    <FormField className="mb-3 fw-bold" name="Title">
                        <Form.Control
                            placeholder="Enter title..."
                            type="text"
                            {...register('title')}
                        />
                    </FormField>

                    <FormField className="mb-3 fw-bold" name="Description">
                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Description"
                        >
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                {...register('description')}
                            />
                        </FloatingLabel>
                    </FormField>

                    <FormField className="mb-3 fw-bold" name="Category">
                        <Form.Select
                            {...register("categoryId")}
                        >
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </Form.Select>
                    </FormField>
{/* 
                    <FormField className="mb-3 fw-bold" name="Image">
                        <Form.Control
                            className="w-auto"
                            placeholder="Enter title..."
                            type="file"
                        {...register("image")}
                        />
                    </FormField> */}

                    <FormField className="mb-3 fw-bold" name="Tags">
                        <Tags
                            tags={inventory.tags}
                            setTags={setSelected}
                        />
                    </FormField>
                    
                    {isError && <p className="text-danger">{error.data?.message}</p>}

                    <ReactionButton isLoading={isLoading} type='submit'>
                        Save
                    </ReactionButton>
                </Form>
            </Container>
        )
    }

}

export default Settings
