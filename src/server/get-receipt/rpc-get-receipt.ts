import { createServerFn } from "@tanstack/react-start";
import { getReceiptWithItems } from "./get-receipt-service";

export const getReceipt = createServerFn({ method: 'GET' })
    .inputValidator((receiptId: string) => receiptId)
    .handler(async ({ data: receiptId }) => {
        return getReceiptWithItems(receiptId);
    });
