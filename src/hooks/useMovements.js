import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovements } from "../store/slices/movementsSlice";
import { useUI } from "./useUI";

export const useMovements = () => {
  const dispatch = useDispatch();
  const { triggerToast } = useUI();
  const { list: movements, status, error } = useSelector((state) => state.movements);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovements());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      triggerToast(error, "error");
    }
  }, [status, error, triggerToast]);

  const reloadMovements = useCallback(() => {
    dispatch(fetchMovements());
  }, [dispatch]);

  return {
    movements,
    loading: status === "loading",
    error,
    reloadMovements,
  };
};
