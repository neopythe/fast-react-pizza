import { useDispatch } from "react-redux";

import {
  decrementQuantity,
  incrementQuantity,
} from "@/features/cart/cartSlice";

import Button from "@/ui/Button";

interface UpdateQuantityProps {
  id: number;
  quantity: number;
}

function UpdateQuantity({ id, quantity }: UpdateQuantityProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decrementQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="round" onClick={() => dispatch(incrementQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
