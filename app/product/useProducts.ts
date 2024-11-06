import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";
import { TProduct } from "@/types/TProduct";

type TProductsParams = {
  category?: "male" | "female";
  productId?: number;
};

export const useProducts = ({ category, productId }: TProductsParams) => {
  const fetchProducts = useQuery<TProduct[], Error>({
    queryKey: ["products", category || "male"],
    queryFn: () => productsAPI.fetchProducts(category || "male"),
  });

  const findProductById = useQuery<TProduct, Error>({
    queryKey: ["product-detail", productId],
    queryFn: () =>
      productId
        ? productsAPI.findProductById(productId)
        : Promise.resolve(null),
  });

  return {
    product: {
      data: findProductById.data,
      error: findProductById.error,
      isLoading: findProductById.isLoading,
    },
    productsList: {
      data: fetchProducts.data,
      isLoading: fetchProducts.isLoading,
      error: fetchProducts.error,
    },
  };
};
