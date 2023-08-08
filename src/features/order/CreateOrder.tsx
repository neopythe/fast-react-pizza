import { useState } from "react";
import { useSelector } from "react-redux";
import {
  redirect,
  useActionData,
  useNavigation,
  ActionFunctionArgs,
  Form,
} from "react-router-dom";

import store from "@/store";

import EmptyCart from "@/features/cart/EmptyCart";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from "@/features/cart/cartSlice";
import { fetchAddress } from "@/features/user/userSlice";

import { useAppDispatch } from "@/hooks";

import { createOrder } from "@/services/apiRestaurant";

import Button from "@/ui/Button";

import { formatCurrency } from "@/utilities/helpers";

import type { StoreState } from "@/types";

interface Errors {
  phone?: string;
}

// https://uibakery.io/regex-library/phone-number

const isValidPhone = (string: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    string,
  );

function CreateOrder() {
  const { username } = useSelector((state: StoreState) => state.user);

  // Testing purposes
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as Errors;

  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? Math.round(totalCartPrice * 0.2) : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <button onClick={() => dispatch(fetchAddress())}>Get position</button>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="sm: mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>
        <div className="sm: mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="sm: mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={String(withPriority)}
            onChange={(event) => setWithPriority(event.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(String(data.cart)),
    phone: String(data.phone), // For type checking below
    priority: data.priority === "true",
  };

  const errors: Errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
