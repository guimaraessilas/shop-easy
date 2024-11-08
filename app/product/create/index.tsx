import { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import ProductForm from "@/components/product/form";

const CreateProduct = () => {
  const navigation = useNavigation();

  const { mutate } = useCreateProduct();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Adicionar Produto",
    });
  }, [navigation]);

  const onSubmit = (product: Partial<TProduct>) => {
    mutate(product, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return <ProductForm onSubmit={onSubmit} />;
};

export default CreateProduct;
