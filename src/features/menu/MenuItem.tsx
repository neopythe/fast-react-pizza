import { useDispatch, useSelector } from "react-redux";

import DeleteButton from "@/features/cart/DeleteButton";
import UpdateQuantity from "@/features/cart/UpdateQuantity";
import { addItem, getItemQuantityById } from "@/features/cart/cartSlice";

import Button from "@/ui/Button";

import { formatCurrency } from "@/utilities/helpers";

import type { Pizza } from "@/types";

interface MenuItemProps {
  pizza: Pizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const quantity = useSelector(getItemQuantityById(id));
  const isInCart = quantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col justify-between pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity id={id} quantity={quantity} />
              <DeleteButton id={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
