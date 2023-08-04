import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import LinkButton from "@/ui/LinkButton";

function Error() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {isRouteError && <h2>{error.data}</h2>}
      {!isRouteError && <p>{(error as Error).message}</p>}
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
