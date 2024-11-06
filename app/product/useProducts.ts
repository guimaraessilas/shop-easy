import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";
import { TProduct } from "@/types/TProduct";

export const useProducts = (category: "male" | "female") => {
  return useQuery<TProduct[]>({
    queryKey: ["products", category],
    queryFn: () => productsAPI.fetchProducts(category),
  });
};
