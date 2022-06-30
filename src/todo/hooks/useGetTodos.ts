import { useQuery } from "react-query";
import { ApiClient } from "../../api/api-client";

const useGetTodos = (page: number = 1) => {
  return useQuery(
    ["todos", page],
    () => {
      const resultsNumber: number = page === 1 ? 40 : 10;
      return ApiClient.get(`https://randomuser.me/api/?results=${resultsNumber}&page=${page}`);
    },
    { refetchOnWindowFocus: false, keepPreviousData: true }
  );
};
export default useGetTodos;