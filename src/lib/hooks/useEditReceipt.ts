import { ReceiptItemDto } from "@/server/dtos";
import { editReceiptItemRpc } from "@/server/edit-receipt/rpc-put-receipt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditReceiptItem(receiptId: string) {
    const _receiptId = receiptId;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: ReceiptItemDto) => {
            return await editReceiptItemRpc({ data: item });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['receipt', _receiptId]
            });
        },
        onError: (error) => {
            console.error('Failed to save item:', error);
        }
    });
}
