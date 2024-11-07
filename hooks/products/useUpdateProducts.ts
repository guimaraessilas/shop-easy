import { useMutation } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["product-update"],
    mutationFn: (product: Partial<TProduct>) =>
      productsAPI.updateProduct(product),
    onSuccess: () => alert("Produto atualizado com sucesso"),
    onError: (error) => {
      alert("Erro ao atualizar o produto");
      console.error(error);
    },
  });
};
