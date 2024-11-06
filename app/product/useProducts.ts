import { useMutation, useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";
import { TProduct } from "@/types/TProduct";
import queryClient from "@/utils/queryClient";

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

  const deleteMutation = useMutation({
    mutationFn: (productId: number) => productsAPI.deleteProduct(productId),
    onSuccess: (product: TProduct) => {
      console.log("produto deletado corretamente: ", product.isDeleted);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-detail"] });
    },
    onError: (error: any) => {
      console.log("erro ao deletar o produto: ", error);
      throw new Error(String(error));
    },
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
    deleteProduct: {
      mutate: deleteMutation.mutate,
      isLoading: deleteMutation.isPending,
      error: deleteMutation.error,
    },
  };
};
