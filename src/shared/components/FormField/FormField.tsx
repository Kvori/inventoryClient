import { Form, FormControlProps } from "react-bootstrap";

interface FormFieldProps extends FormControlProps {
    errorMessage?: string
}

function FormField({ className, name, errorMessage, children, ...props }: FormFieldProps) {
    return (
        <Form.Group className={className} {...props}>
            <Form.Label>
                {name}
            </Form.Label>
            {children}
            {errorMessage && <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>}
        </Form.Group>
    );
}

export default FormField;