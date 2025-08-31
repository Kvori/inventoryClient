import { Card, Container, Row, Tab, Tabs } from 'react-bootstrap'
import TABS from './consts'
import { useFetchInventoryQuery } from './api/InventoryApi'
import { useNavigate, useParams } from 'react-router-dom'
import routes from '@/app/config/routesConfig'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import { useAppDispatch } from '@/shared/hooks/redux'
import { setInventory } from './model/inventorySlice'
import remarkBreaks from 'remark-breaks'

function Inventory() {
    const id = Number(useParams().id)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    !id && navigate(routes.main.home)

    const { data: inventoryData, error } = useFetchInventoryQuery(id)

    useEffect(() => {
        if (inventoryData) {
            dispatch(setInventory(inventoryData))
        }
        return () => {
            dispatch(setInventory(null))
        }
    }, [inventoryData])

    if (inventoryData)
        return (
            <Container>
                <Card className="p-5 mb-5">
                    <h1>{inventoryData.title}</h1>
                    {inventoryData.description && (
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{inventoryData.description}</ReactMarkdown>
                    )}
                    {inventoryData.tags &&
                        <p className="fst-italic text-black-50">{inventoryData.tags.map(tag => tag.title).join(', ')}</p>
                    }

                    <Tabs
                        defaultActiveKey={'Items'}
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        {TABS.map((tab) => {
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
}

export default Inventory
