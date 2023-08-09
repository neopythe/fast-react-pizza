import { useFetcher } from "react-router-dom";
import { ActionFunctionArgs } from "react-router-dom";

import { updateOrder } from "@/services/apiRestaurant";

import Button from "@/ui/Button";

// import type { Order } from "@/types";

// interface UpdateOrderProps {
//   order: Order;
// }

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button>Make priority</Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  await updateOrder(params.orderId!, { priority: true });
  return null;
}

export default UpdateOrder;
