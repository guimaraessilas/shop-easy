import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";

export const useFetchAllProducts = ({ category }: TFetchProductsParams) => {
  return useQuery<TProduct[], Error>({
    queryKey: [`products-${category}`],
    queryFn: () => productsAPI.fetchProducts({ category }),
  });
};
