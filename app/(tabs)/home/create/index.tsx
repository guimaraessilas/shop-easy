import ProductForm from "../../../../components/product/form";
import { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";

const CreateProduct = () => {
  const navigation = useNavigation();

  const { mutate } = useCreateProduct();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Adicionar Produto",
      headerTitleAlign: "left",
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
