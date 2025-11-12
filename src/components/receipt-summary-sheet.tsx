import { ReceiptDto } from "@/server/dtos";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function ReceiptSummarySheet(props: {
    showSheet: boolean;
    receipt: ReceiptDto;
    closeSheet: () => void;
    handleSaveSummary: (data: { tax: number; tip: number }) => void;
}) {
    const { showSheet, receipt, closeSheet, handleSaveSummary } = props;

    const [taxMode, setTaxMode] = useState<'percentage' | 'absolute'>('absolute');
    const [tipMode, setTipMode] = useState<'percentage' | 'absolute'>('absolute');

    const [taxValue, setTaxValue] = useState(receipt.tax ?? 0);
    const [tipValue, setTipValue] = useState(receipt.tip ?? 0);

    const subtotal = receipt.items.reduce((sum, item) => sum + item.price, 0);

    const taxAmount = taxMode === 'percentage' ? (subtotal * taxValue) / 100 : taxValue;
    const tipAmount = tipMode === 'percentage' ? (subtotal * tipValue) / 100 : tipValue;
    const grandTotal = subtotal + taxAmount + tipAmount;

    return (
        <Sheet open={showSheet} onOpenChange={(open) => !open && closeSheet()}>
            <SheetContent side="bottom" className="rounded-t-2xl px-4 py-4">
                <SheetHeader className='pl-0'>
                    <SheetTitle className="text-xl">Edit Totals</SheetTitle>
                    <SheetDescription className="text-sm">Adjust tax and tip</SheetDescription>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                    {/* Subtotal - Locked */}
                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-muted-foreground">Subtotal</span>
                            <span className="text-2xl font-bold">${subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Tax */}
                    <div className="space-y-3">
                        <Label className="text-lg font-medium">Tax</Label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">
                                    {taxMode === 'percentage' ? '%' : '$'}
                                </span>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={taxValue}
                                    onChange={(e) => setTaxValue(parseFloat(e.target.value) || 0)}
                                    className="text-lg h-12 pl-8 pr-4"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="inline-flex rounded-lg bg-muted p-1">
                                <button
                                    type="button"
                                    onClick={() => setTaxMode('absolute')}
                                    className={`px-4 py-3 text-sm font-medium rounded-md transition-all min-w-[48px] ${taxMode === 'absolute'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground'
                                        }`}
                                >
                                    $
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTaxMode('percentage')}
                                    className={`px-4 py-3 text-sm font-medium rounded-md transition-all min-w-[48px] ${taxMode === 'percentage'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground'
                                        }`}
                                >
                                    %
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tip */}
                    <div className="space-y-3">
                        <Label className="text-lg font-medium">Tip</Label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">
                                    {tipMode === 'percentage' ? '%' : '$'}
                                </span>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={tipValue}
                                    onChange={(e) => setTipValue(parseFloat(e.target.value) || 0)}
                                    className="text-lg h-12 pl-8 pr-4"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="inline-flex rounded-lg bg-muted p-1">
                                <button
                                    type="button"
                                    onClick={() => setTipMode('absolute')}
                                    className={`px-4 py-3 text-sm font-medium rounded-md transition-all min-w-[48px] ${tipMode === 'absolute'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground'
                                        }`}
                                >
                                    $
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipMode('percentage')}
                                    className={`px-4 py-3 text-sm font-medium rounded-md transition-all min-w-[48px] ${tipMode === 'percentage'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground'
                                        }`}
                                >
                                    %
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Grand Total Preview */}
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-base font-medium">Grand Total</span>
                            <span className="text-2xl font-bold text-primary">${grandTotal.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1.5">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="font-medium">${taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tip</span>
                                <span className="font-medium">${tipAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 h-12 text-base"
                            onClick={closeSheet}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            className="flex-1 h-12 text-base"
                            onClick={() => {
                                handleSaveSummary({ tax: taxAmount, tip: tipAmount });
                                closeSheet();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
