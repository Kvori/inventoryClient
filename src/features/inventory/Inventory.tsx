import { Card, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap'
import { Tabs_default, Tabs_owner } from './consts'
import { useCheckInventoryFavoriteQuery, useFetchInventoryQuery, useUpdateInventoryFavoriteMutation } from './api/InventoryApi'
import { useNavigate, useParams } from 'react-router-dom'
import routes from '@/app/config/routesConfig'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { setInventory } from './model/inventorySlice'
import remarkBreaks from 'remark-breaks'
import PageLoading from '@/shared/components/PageLoading/PageLoading'
import FormField from '@/shared/components/FormField/FormField'
import { useForm, useWatch } from 'react-hook-form'
import ReactionButton from '@/shared/components/ReactionButton/ReactionButton'

function Inventory() {
    const id = Number(useParams().id)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.userReducer.user?.id)

    !id && navigate(routes.main.home)

    const { data: inventoryData, error } = useFetchInventoryQuery(id)

    const [ownerStatus, setOwnerStatus] = useState(false)

    useEffect(() => {
        if (inventoryData) {
            dispatch(setInventory(inventoryData))
            setOwnerStatus(userId === inventoryData.creatorId)
        }
        return () => {
            dispatch(setInventory(null))
        }
    }, [inventoryData])

    const { data, isSuccess: isCheckSuccess } = useCheckInventoryFavoriteQuery(id)

    const [updateFavorite] = useUpdateInventoryFavoriteMutation()

    const {
        register,
        handleSubmit,
        setValue,
        control
    } = useForm()

    const watchFavorite = useWatch({ name: 'favorite', control})    
    const [lastSavedStatus, setLastSavedStatus] = useState()

    useEffect(() => {
        const currentStatus = watchFavorite

        if (currentStatus !== lastSavedStatus && currentStatus !== data?.favoriteFlag) {
            updateFavorite({favoriteFlag: currentStatus, inventoryId: id, userId})
            setLastSavedStatus(currentStatus)
        }

    }, [watchFavorite])


    useEffect(() => {
        if (isCheckSuccess) {
            setValue('favorite', data.favoriteFlag)
        }
    }, [isCheckSuccess])

    if (inventoryData)
        return (
            <Container>
                <Card className="p-5 mb-5">
                    <Row>
                        <Col xs={8}>
                            <h1 className="mb-4">{inventoryData.title}</h1>
                            {inventoryData.description && (
                                <ReactMarkdown remarkPlugins={[remarkBreaks]}>{inventoryData.description}</ReactMarkdown>
                            )}
                            {inventoryData.tags &&
                                <p className="fst-italic text-black-50">{inventoryData.tags.map(tag => tag.title).join(', ')}</p>
                            }
                        </Col>
                        {<Col xs={4}>
                            <div className="d-flex justify-content-end">
                                {!ownerStatus &&
                                    <Form>
                                        <FormField className="fw-bold fs-3 d-flex align-items-center gap-2" name="Favorite">
                                            <Form.Check {...register('favorite')} />
                                        </FormField>
                                    </Form>}
                            </div>
                        </Col>}
                    </Row>

                    <Tabs
                        defaultActiveKey={'Items'}
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        {Tabs_default.map((tab) => {
                            return (
                                <Tab
                                    key={tab.title}
                                    eventKey={tab.title}
                                    title={tab.title}
                                >
                                    <tab.Component />
                                </Tab>
                            )
                        })}
                        {ownerStatus && Tabs_owner.map((tab) => {
                            return (
                                <Tab
                                    key={tab.title}
                                    eventKey={tab.title}
                                    title={tab.title}
                                >
                                    <tab.Component />
                                </Tab>
                            )
                        })}
                    </Tabs>
                </Card>
            </Container>
        )
    if (error) return <div>{error.data?.message || 'error 404'}</div>
    return <PageLoading />
}

export default Inventory
