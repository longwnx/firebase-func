interface CartItem {
  productId: number;
  variationId: number | null;
  quantity: number;
}

interface Cart {
  cartId: string;
  customerId: string;
  lineItems: CartItem[];
}
