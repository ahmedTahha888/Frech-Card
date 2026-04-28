import { ProductType } from "./product.types"


export type WishlistItemType = ProductType

export interface WishlistType {
  count: number,
  status: string,
  data: WishlistItemType[]
}
