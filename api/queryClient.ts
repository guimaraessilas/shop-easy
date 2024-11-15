import { QueryClient } from "@tanstack/react-query";

export default new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 min.
    },
  },
});
