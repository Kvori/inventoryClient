import { Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import ReactionButton from "../../../shared/components/ReactionButton/ReactionButton";
import { useCreateInventoryMutation, useDeleteInventoriesMutation, useFetchFavoriteInventoriesByUserQuery, useFetchUserInventoriesQuery, } from "../../inventory/api/InventoryApi";
import { useNavigate, useParams } from "react-router-dom";
import routes from "@/app/config/routesConfig";
import { useFetchUserQuery } from "../userApi";
import PageLoading from "@/shared/components/PageLoading/PageLoading";
import PageError from "@/shared/components/PageError/PageError";
import InventoryList from "../../../shared/components/InventoryList/InventoryList";
import { useState } from "react";

function User() {
    const userId = Number(useParams().id)
    const navigate = useNavigate()

    if (!userId) navigate(routes.main.home)

    const { data: userProfile, error: userError, isLoading: userLoading, isError: userIsError } = useFetchUserQuery(userId)

    const { data: createdInventories, error: createdInventoriesError, isLoading: createdInventoriesLoading } = useFetchUserInventoriesQuery(userId)
    const [deleteCreatedInvetories] = useDeleteInventoriesMutation()
    const [createInventory] = useCreateInventoryMutation()

    const { data: favoriteInventories, error: favoriteInventoriesError, isLoading: favoriteInventoriesLoading } = useFetchFavoriteInventoriesByUserQuery(userId)

    const onCreate = () => {
        createInventory(userId)
    }

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const onDelete = ({ inventoryIds, userId }: { inventoryIds: number[], userId: number }) => {
        deleteCreatedInvetories({ inventoryIds, userId })
        setSelectedIds([])
    }

    if (userLoading) return <PageLoading />
    if (userError && userIsError) {
        return <PageError
            status={userError.data?.status || 404}
            message={userError.data?.message || "Unable to get page"}
        />
    } else return (
        <Container>
            <Card className="mb-5 shadow-sm">
                <Row className="g-0">
                    <Col md={12} className="p-4">
                        <h5 className="mb-3">Profile</h5>
                        <ListGroup variant="flush" className="mb-4">
                            <ListGroupItem><strong>Name:</strong> {userProfile?.name}</ListGroupItem>
                            <ListGroupItem><strong>Email:</strong> {userProfile?.email}</ListGroupItem>
                        </ListGroup>
                        <ReactionButton onClick={onCreate}>
                            Add inventory
                        </ReactionButton>
                    </Col>
                </Row>
            </Card>

            <Row>
                <Col xs={12} md={6}>
                    <Card className="p-4 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">User Inventories</h5>
                            <ReactionButton onClick={() => onDelete({ inventoryIds: selectedIds, userId })} variant="outline-danger" size="sm">Delete Selected</ReactionButton>
                        </div>
                        <InventoryList
                            isLoading={createdInventoriesLoading}
                            data={createdInventories}
                            className="w-100"
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                        />
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className="p-4 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Available inventory</h5>
                        </div>
                        <InventoryList
                            isLoading={favoriteInventoriesLoading}
                            data={favoriteInventories}
                            className="w-100"
                        />
                    </Card>
                </Col>
            </Row>

        </Container >
    );
}

export default User;