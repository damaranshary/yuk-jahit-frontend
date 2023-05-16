export interface OrderResponse {
  orders: OrderDataTypes[];
}

export interface OrderDataTypes {
  owner: OwnerTypes;
  _id: string;
  address: string;
  products: ProductTypes[];
  status: string;
  bill: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OwnerTypes {
  ownerId: string;
  name: string;
  phone: string;
  email: string;
}

export interface ProductTypes {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  _id: string;
  product_img: string;
}

export interface CheckoutOrderTypes {
  token: string;
  address: string;
  paymentMethod: string;
}

export interface ResponseCheckoutOrderTypes {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  actions: Action[];
  expiry_time: string;
}

export interface Action {
  name: string;
  method: string;
  url: string;
}
