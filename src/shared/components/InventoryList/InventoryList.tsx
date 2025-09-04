import { IInventory } from "@/features/inventory/types";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "@/app/config/routesConfig";

interface InventoryListProps {
    isLoading: boolean;
    data: IInventory[] | undefined;
    className?: string;
    selectedIds?: number[];
    setSelectedIds?: React.Dispatch<React.SetStateAction<number[]>>;
}

function InventoryList({ isLoading, data, className = "", selectedIds, setSelectedIds }: InventoryListProps) {
    const handleToggle = (id: number) => {
        if (setSelectedIds) 
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        if (setSelectedIds) 
        if (data) {
            const allIds = data.map(inv => inv.id);
            setSelectedIds(selectedIds.length === allIds.length ? [] : allIds);
        }
    };

    return (
        <>
            {selectedIds && <div className="d-flex align-items-center mb-2">
                <Form.Check
                    type="checkbox"
                    checked={data?.length === selectedIds.length && data.length > 0}
                    onChange={handleToggleAll}
                    className="me-2"
                />
                <span className="fw-bold">Select all</span>
            </div>}

            {isLoading ? (
                <Card className="p-5 d-flex flex-column h-100 justify-content-center align-items-center" style={{ height: 100 }}>
                    <Spinner />
                </Card>
            ) : data && data.length > 0 ? (
                data.map(inventory => (
                    <div key={inventory.id} className="d-flex align-items-center">
                        {selectedIds && <Form.Check
                            type="checkbox"
                            checked={selectedIds.includes(inventory.id)}
                            onChange={() => handleToggle(inventory.id)}
                            className="me-2"
                        />}
                        <Button
                            className={className}
                            style={{ borderRadius: 0 }}
                            variant="outline-secondary"
                            as={Link}
                            to={routes.inventory.getItem(inventory.id)}
                        >
                            {inventory.title}
                        </Button>
                    </div>
                ))
            ) : (
                <Card className="p-5 text-center text-black-50">
                    The inventory list is empty
                </Card>
            )}
        </>
    );
}

export default InventoryList;
