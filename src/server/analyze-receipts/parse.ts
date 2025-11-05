import { GoogleGenerativeAIProvider } from "@ai-sdk/google";
import { generateText } from 'ai';
import { RECEIPT_PARSE_PROMPT } from "./prompts";
import z from "zod";
import { ParseError, parseStructuredReceiptResponse } from "./llm-json-parse";

const ReceiptItemSchema = z.object({
    rawText: z.string().min(1),
    interpreted: z.string().min(1),
    price: z.number().positive(),
    quantity: z.number().positive().default(1),
});

const ParsedReceiptSchema = z.object({
    items: z.array(ReceiptItemSchema).min(1, 'Receipt must have at least one item'),
    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative().default(0),
    tip: z.number().nonnegative().default(0),
    total: z.number().positive(),
    metadata: z.object({
        restaurant: z.string().optional(),
        date: z.string().optional(),
    }).optional().default({}),
});

export type ParsedReceipt = z.infer<typeof ParsedReceiptSchema>;
export type ReceiptItem = z.infer<typeof ReceiptItemSchema>;

export const parseReceiptItems = async (ai: GoogleGenerativeAIProvider, imageBuffer: ArrayBuffer) => {
    try {

        const { text, providerMetadata } = await generateText({
            model: ai('gemini-2.5-pro'),
            system: RECEIPT_PARSE_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image' as const,
                            image: imageBuffer,
                        },
                    ],
                },
            ],
        });
        const result = parseStructuredReceiptResponse(text, ParsedReceiptSchema);
        return { ...result, providerMetadata };

    } catch (error) {
        if (error instanceof ParseError) {
            console.error('Failed to parse receipt JSON:', {
                message: error.message,
                rawText: error.rawText.slice(0, 500), // Log first 500 chars
            });
            throw new Error('Failed to parse receipt. The image may be unclear or not a receipt.');
        }

        if (error instanceof z.ZodError) {
            console.error('Receipt validation failed:', error.issues);
            throw new Error('Receipt data is invalid or incomplete.');
        }

        console.error('Unexpected error parsing receipt:', error);
        throw new Error('Failed to process receipt image.');
    }
}
