import { Container, Spinner } from "react-bootstrap";

function PageLoading() {
    return (
        <Container className="m-auto vh-100 d-flex flex-column justify-content-center align-items-center">
            <p>Page loading . . .</p>
            <Spinner />
        </Container>
    );
}

export default PageLoading;