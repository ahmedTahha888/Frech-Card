import { ProductType } from "./product.types"

export interface CardType{
    cartId: string,
    message: string,
    status: string,
    numOfCartItems: number,
    data : {
        length(length: any): unknown
        totalCartPrice: number,
        products:  CardItemType[]
    }
    
}

export interface CardItemType {
    count: number,
    price: number,
    product : ProductType

}



