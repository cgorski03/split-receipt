export function GetClaimsForRoom(roomId: string) {

}

export type ItemClaimRequest = {
    roomId: string;
    roomMember: string;
    itemId: string;
    quantity: number;
}
export function MakeItemClaim(request: ItemClaimRequest) {

}

export type DeleteItemClaimRequest = {
    roomId: string;
    roomMember: string;
    itemId: string;
}
export function DeleteItemClaim(request: DeleteItemClaimRequest) {

}
