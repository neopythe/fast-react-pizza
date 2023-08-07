import { useDispatch } from "react-redux";

import { addItem } from "@/features/cart/cartSlice";

import Button from "@/ui/Button";

import { formatCurrency } from "@/utilities/helpers";

import type { Pizza } from "@/types";

type Props = {
  pizza: Pizza;
};

function MenuItem({ pizza }: Props) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
          {!soldOut && (
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
