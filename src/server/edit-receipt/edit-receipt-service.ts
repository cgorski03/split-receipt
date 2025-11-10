import { eq } from "drizzle-orm";
import { db } from "../db";
import { receiptItem } from "../db/schema";
import { ReceiptItemDto, receiptItemEntityToDtoHelper } from "../dtos";

export async function editReceiptItem(item: ReceiptItemDto) {
    const [updatedItem] = await db.update(receiptItem).set({
        interpretedText: item.interpretedText,
        price: item.price.toString(),
        quantity: item.quantity.toString(),
    })
        .where(eq(receiptItem.id, item.id))
        .returning();
    return receiptItemEntityToDtoHelper(updatedItem);
}
