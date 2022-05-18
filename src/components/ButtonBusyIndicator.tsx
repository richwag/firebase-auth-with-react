import { Spinner } from "react-bootstrap";

export interface ButtonBusyProps {
    busy: boolean;
}
export function ButtonBusyIndicator({ busy }: ButtonBusyProps) {
    return busy ? (
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ) : (
        <></>
    );
}
