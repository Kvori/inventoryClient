import { Card, Col, Container, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReactionButton from "../../../shared/components/ReactionButton/ReactionButton";
import { IUser } from "../types";
import { useCreateInventoryMutation, useFetchUserInventoriesQuery, } from "../../inventory/api/InventoryApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import routes from "@/app/config/routesConfig";
import { useFetchUserQuery } from "../userApi";

function User() {
    const [user, setUser] = useState<IUser>()
    const userId = Number(useParams().id)
    const navigate = useNavigate()

    if (!userId) navigate(routes.main.home)

    const { data: userProfile, error: userError, isLoading: userLoading } = useFetchUserQuery(userId)
    const { data: userInventories, error: inventoriesError, isLoading: inventoriesLoading } = useFetchUserInventoriesQuery(userId)

    const [createInventory] = useCreateInventoryMutation()
    const onCreate = async () => {
        createInventory(user.id)
    }

    useEffect(() => {
        if (!userLoading && userProfile) {
            setUser(userProfile)
        }
    }, [userLoading, userProfile])

    return (
        <Container>
            <Card className="p-5 mb-5">
                <Row>
                    <Col xs={12} md={12}>
                        <h1>Profile</h1>
                        <p>{`Name: ${user ? user.name : 'Loading...'}`}</p>
                        <p>{`Email: ${user ? user.email : 'Loading...'}`}</p>
                        <ReactionButton onClick={onCreate}>
                            Add inventory
                        </ReactionButton>
                    </Col>
                </Row>
            </Card>
            <Row>
                <Col xs={12} md={6}>
                    <ListGroup>
                        <h3>My inventories</h3>
                        {!inventoriesLoading && userInventories && userInventories.map(inventory =>
                            <ListGroupItem key={inventory.id} as={Link} to={routes.inventory.getItem(inventory.id)}>{inventory.title}</ListGroupItem>
                        )}
                    </ListGroup>
                </Col>
                <Col xs={12} md={6}>
                    <ListGroup>
                        <h3>Friends Inventoris</h3>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default User;