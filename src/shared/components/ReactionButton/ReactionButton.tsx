import { ReactNode } from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

interface ReactionButtonProps extends ButtonProps {
    isLoading?: boolean,
    icon?: ReactNode
}

function ReactionButton({ children, isLoading, icon, className, ...props }: ReactionButtonProps) {
    return (
        <Button
            className={`px-4 position-relative ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Spinner className="position-absolute" animation="border" size="sm" style={{top: "calc(50% - 5px)", left: "calc(50% - 5px)"}} />}
            {!isLoading && icon && <span className="d-flex align-items-center">{icon}</span>}
            {children}
        </Button>
    );
}

export default ReactionButton;