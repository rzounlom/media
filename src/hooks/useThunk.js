import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

export function useThunk(thunk) {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isloading, error];
}
