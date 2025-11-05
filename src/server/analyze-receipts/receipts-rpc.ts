import { db } from "../db";
import { receipt } from "../db/schema";
import { google } from "./google";
import { parseReceiptItems } from "./parse";

type ParsedReceiptResponse = {
    url: URL;
}
export async function parseReceiptImage(file: File): Promise<ParsedReceiptResponse> {
    const buffer = await file.arrayBuffer();
    const ai = google();
    const parseResult = await parseReceiptItems(ai, buffer);
    const uuid = crypto.randomUUID();

    await db.insert(receipt).values({
        id: uuid,
        title: parseResult.metadata.restaurant ?? 'No Title',
        subtotal: parseResult.subtotal?.toString() ?? null,
        tax: parseResult.tax?.toString() ?? null,
        tip: parseResult.tip?.toString() ?? null,
        grandTotal: parseResult.total?.toString() ?? null,
        rawResponse: JSON.stringify(parseResult),
    });

}
