import { createServerFn } from "@tanstack/react-start";
import { editReceiptItem } from "./edit-receipt-service";
import { ReceiptItemDto } from "../dtos";

export const editReceiptItemRpc = createServerFn({ method: 'POST' })
    .inputValidator((receiptItem: ReceiptItemDto) => receiptItem)
    .handler(async ({ data: receipt }) => {
        return editReceiptItem(receipt);
    });
