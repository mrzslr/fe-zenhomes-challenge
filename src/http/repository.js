import { useQuery } from "react-query";
import { ApiClient } from "./api-client";

export const useGetTodos = (page = 1) => {
  return useQuery(
    ["todos", page],
    () => {
      const resultsNumber = page === 1 ? 40 : 10;
      return ApiClient.get(`https://randomuser.me/api/?results=${resultsNumber}&page=${page}`);
    },
    { refetchOnWindowFocus: false, keepPreviousData: true }
  );
};
