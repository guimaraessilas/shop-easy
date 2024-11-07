import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";

export const useFindProductById = ({ productId }: TFindProductByIdParams) => {
  return useQuery<TProduct | null, Error>({
    queryKey: ["product-detail", productId],
    queryFn: () =>
      productId
        ? productsAPI.findProductById(productId)
        : Promise.resolve(null),
    enabled: !!productId,
  });
};
