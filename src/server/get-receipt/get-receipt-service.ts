import { getAllReceiptInfo } from "./repository";
import { receiptEntityToDtoHelper, ReceiptDto } from "../dtos";

type processingStatus = { status: 'processing' }
type failedStatus = { attempts: number }


export type GetReceiptResponse = processingStatus | failedStatus | ReceiptDto;
export async function getReceiptWithItems(receiptId: string): Promise<GetReceiptResponse> {
    const receiptInformation = await getAllReceiptInfo(receiptId);
    if (receiptInformation?.processingInfo.some(x => x.processingStatus === 'success')) {
        return receiptEntityToDtoHelper(receiptInformation);
    }
    if (receiptInformation?.processingInfo.some(x => x.processingStatus === 'processing')) {
        return { status: 'processing' }
    }
    return { attempts: receiptInformation?.processingInfo.filter((info) => info.processingStatus === 'failed').length ?? 0 }
}

