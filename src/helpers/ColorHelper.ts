export function ColorForStatus(status: string) {
    switch(status.toUpperCase()) {
        case "REQUESTING_BOOST": return "default";
        case "PAYMENT_PENDING": return "warning";
        case "PAYMENT_FAILED": return "danger";
        case "PENDING": return "secondary";
        case "IN_PROGRESS": return "primary";
        case "COMPLETED": return "success";
        case "CANCELLED_BY_CUSTOMER": return "default";
        case "REFUNDED": return "danger";
        case "REFUND_REQUESTED": return "warning";
        case "PAUSED": return "default";

    }
}