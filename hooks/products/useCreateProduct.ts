import { useMutation } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["product-create"],
    mutationFn: (product: Partial<TProduct>) =>
      productsAPI.createProduct(product),
    onSuccess: () => alert("Produto criado com sucesso"),
    onError: (error) => console.error("Erro ao criar produto: ", error),
  });
};
