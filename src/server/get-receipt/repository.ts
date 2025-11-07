import { eq } from "drizzle-orm";
import { db } from "../db";
import { receipt } from "../db/schema";

export async function getAllReceiptInfo(receiptId: string) {
    return await db.query.receipt.findFirst({
        where: eq(receipt.id, receiptId),
        with: {
            items: true,
            processingInfo: true,
        }
    })
}
