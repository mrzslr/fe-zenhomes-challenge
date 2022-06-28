import { useQuery } from "react-query";
import { ApiClient } from "./api-client";

export const useGetTodos = () => {
  return useQuery(
    "todos",
    () => {
      console.info("server request sent.");
      return ApiClient.get("https://randomuser.me/api/?results=40");
    },
    { refetchOnWindowFocus: false }
  );
};
