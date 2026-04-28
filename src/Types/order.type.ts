export interface shippingAddressType{
    shippingAddress:{
        details: string,
        city: string,
        phone: string,
        postalCode?: string,
    }
}

export interface OrderUser {
  _id: string
  name: string
  email: string
  phone: string
}

export interface OrderSubCategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface OrderProductCategory {
  _id: string
  name: string
  slug: string
  image: string
}

export interface OrderProductBrand {
  _id: string
  name: string
  slug: string
  image: string
}

export interface OrderProduct {
  subcategory: OrderSubCategory[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: OrderProductCategory
  brand: OrderProductBrand
  ratingsAverage: number
  id: string
}

export interface OrderCartItem {
  count: number
  _id: string
  product: OrderProduct
  price: number
}

export interface OrderShippingAddress {
  details: string
  phone: string
  city: string
  postalCode: string
}

export interface OrderType {
  shippingAddress: OrderShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: 'cash' | 'card'
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: OrderUser
  cartItems: OrderCartItem[]
  createdAt: string
  updatedAt: string
  id: number
}

export interface OrdersResponse {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }
  data: OrderType[]
}