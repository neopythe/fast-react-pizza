type CartItem = {
  name: string;
  pizzaId: number;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
};

type CartState = {
  cart: CartItem[];
};

type Order = {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: CartItem[];
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
};

type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

type UserState = {
  username: string;
};

type StoreState = {
  user: UserState;
};

export type { CartItem, CartState, Order, Pizza, StoreState, UserState };
