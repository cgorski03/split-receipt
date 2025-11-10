
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
