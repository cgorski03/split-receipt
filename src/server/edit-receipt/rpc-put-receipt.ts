import { createServerFn } from "@tanstack/react-start";
import { deleteReceiptItem, editReceiptItem } from "./edit-receipt-service";
import { ReceiptItemDto } from "../dtos";

export const editReceiptItemRpc = createServerFn({ method: 'POST' })
    .inputValidator((receiptItem: ReceiptItemDto) => receiptItem)
    .handler(async ({ data: receipt }) => {
        return editReceiptItem(receipt);
    });

export const deleteReceiptItemRpc = createServerFn({ method: 'POST' })
    .inputValidator((receiptItem: ReceiptItemDto) => receiptItem)
    .handler(async ({ data: receipt }) => {
        return deleteReceiptItem(receipt);
    });
