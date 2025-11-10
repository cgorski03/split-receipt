import { ReceiptItemDto } from "@/server/get-receipt/types";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export function EditItemSheet(props: { item: ReceiptItemDto | null, setCurrentlyEditingItem: (item: ReceiptItemDto | null) => void }) {
    const { item, setCurrentlyEditingItem } = props;
    return (
        <Sheet
            open={!!item}
            onOpenChange={(open) => !open && setCurrentlyEditingItem(null)}
        >
            <SheetContent side="bottom" className="h-[85vh]">
                {item && (
                    <>
                        <SheetHeader>
                            <SheetTitle>Edit Item</SheetTitle>
                            <SheetDescription>
                                Adjust item details if OCR got them wrong
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 space-y-5">
                            {/* Item Name */}
                            <div className="space-y-2">
                                <Label htmlFor="itemName" className="text-base">
                                    Item Name
                                </Label>
                                <Input
                                    id="itemName"
                                    type="text"
                                    defaultValue={item.interpretedText}
                                    className="text-lg h-12"
                                    placeholder="e.g., Cheeseburger"
                                />
                            </div>

                            {/* Price and Quantity Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-base">
                                        Price
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                                            $
                                        </span>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            defaultValue={item.price}
                                            className="text-lg h-12 pl-7"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quantity" className="text-base">
                                        Quantity
                                    </Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        defaultValue={item.quantity}
                                        className="text-lg h-12"
                                        placeholder="1"
                                    />
                                </div>
                            </div>

                            {/* Calculated Total */}
                            <div className="p-4 bg-muted/50 rounded-lg border">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Item Total
                                    </span>
                                    <span className="text-2xl font-bold text-foreground">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                                {item.quantity > 1 && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        ${(item.price / item.quantity).toFixed(2)} × {item.quantity}
                                    </p>
                                )}
                            </div>

                            {/* Raw OCR Text (read-only, for reference) */}
                            <div className="space-y-2">
                                <Label className="text-base text-muted-foreground">
                                    Original OCR Text
                                </Label>
                                <div className="p-3 bg-muted/30 rounded-md border border-dashed">
                                    <p className="text-sm font-mono text-muted-foreground">
                                        {item.rawText}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-4">
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12"
                                        onClick={() => setCurrentlyEditingItem(null)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="flex-1 h-12"
                                        onClick={() => {
                                            // TODO: Save changes
                                            setCurrentlyEditingItem(null)
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </div>

                                {/* Delete Button */}
                                <Button
                                    variant="destructive"
                                    className="w-full h-12"
                                    onClick={() => {
                                        // TODO: Delete item
                                        setCurrentlyEditingItem(null)
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Item
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>

    )
}
