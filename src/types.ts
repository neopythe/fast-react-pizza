type Order = {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
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

export type { Order, Pizza };
