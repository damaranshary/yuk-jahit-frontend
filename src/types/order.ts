export interface OrderResponse {
    orders: OrderDataTypes[]
  }
  
  export interface OrderDataTypes {
    owner: OwnerTypes
    _id: string
    address: string
    products: ProductTypes[]
    status: string
    bill: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface OwnerTypes {
    ownerId: string
    name: string
    phone: string
    email: string
  }
  
  export interface ProductTypes {
    productId: string
    name: string
    quantity: number
    price: number
    _id: string
  }
  