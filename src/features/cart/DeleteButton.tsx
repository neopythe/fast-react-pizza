import { useDispatch } from "react-redux";

import { deleteItem } from "@/features/cart/cartSlice";

import Button from "@/ui/Button";

interface DeleteButtonProps {
  id: number;
}

function DeleteButton({ id }: DeleteButtonProps) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>
  );
}

export default DeleteButton;
