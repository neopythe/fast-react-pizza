import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {isRouteError && <h2>{error.data}</h2>}
      {!isRouteError && <p>{(error as Error).message}</p>}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
