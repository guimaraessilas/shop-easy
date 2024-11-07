import { useMutation } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";
import queryClient from "@/utils/queryClient";

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["product-delete"],
    mutationFn: (productId: number) => productsAPI.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-detail"] });
      alert("Produto excluído com sucesso");
    },
    onError: (error) => console.error("Erro ao excluir produto:", error),
  });
};
