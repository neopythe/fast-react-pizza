import { formatCurrency } from "@/utilities/helpers";

import DeleteButton from "@/features/cart/DeleteButton";
import UpdateQuantity from "@/features/cart/UpdateQuantity";

import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity} &times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity id={item.pizzaId} quantity={quantity} />
        <DeleteButton id={item.pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
