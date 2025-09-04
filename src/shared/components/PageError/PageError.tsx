import { Container } from "react-bootstrap";

function PageError({status, message}: {status: string, message: string}) {
    return (  
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <h1>Error</h1>
            <h2>{`${status}: ${message}`}</h2>
        </Container>
    );
}

export default PageError;