import { getAllReceiptInfo } from "./repository";

type processingStatus = { status: 'processing' }
type failedStatus = { attempts: number }
export type ReceiptItemDto = {
    id: string;
    rawText: string;
    interpretedText: string;
    price: number;
    quantity: number;
}
export type ReceiptDto = {
    id: string;
    title: string | null;
    subtotal: number | null;
    tax: number | null;
    tip: number | null;
    grandTotal: number | null;
    createdAt: Date | null;
    items: ReceiptItemDto[]

} | null;

const parseNullable = (v: string | null): number | null =>
    v === null ? null : parseFloat(v)

const generateReceiptDtoFromDbReceipt = (
    receipt: Awaited<ReturnType<typeof getAllReceiptInfo>>,
): ReceiptDto => {
    if (!receipt) return null
    return {
        id: receipt.id,
        title: receipt.title,
        subtotal: parseNullable(receipt.subtotal),
        tax: parseNullable(receipt.tax),
        tip: parseNullable(receipt.tip),
        grandTotal: parseNullable(receipt.grandTotal),
        createdAt: receipt.createdAt,
        items: receipt.items.map((item) => ({
            id: item.id,
            rawText: item.rawText,
            interpretedText: item.interpretedText,
            price: parseFloat(item.price),
            quantity: parseFloat(item.quantity),
        })),
    }
}

export type GetReceiptResponse = processingStatus | failedStatus | ReceiptDto;
export async function getReceiptWithItems(receiptId: string): Promise<GetReceiptResponse> {
    const receiptInformation = await getAllReceiptInfo(receiptId);
    if (receiptInformation?.processingInfo.some(x => x.processingStatus === 'success')) {
        return generateReceiptDtoFromDbReceipt(receiptInformation);
    }
    if (receiptInformation?.processingInfo.some(x => x.processingStatus === 'processing')) {
        return { status: 'processing' }
    }
    return { attempts: receiptInformation?.processingInfo.filter((info) => info.processingStatus === 'failed').length ?? 0 }
}

