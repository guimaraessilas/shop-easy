import { useLocalSearchParams, useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

import { useFindProductById } from "@/hooks/products/useFindProductById";
import { useUpdateProduct } from "@/hooks/products/useUpdateProducts";
import ProductForm from "@/components/product/form";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";

const EditProduct = () => {
  const { id } = useLocalSearchParams();

  const { data, error, isLoading } = useFindProductById({
    productId: Number(id),
  });

  const { mutate: updateProduct } = useUpdateProduct();

  const router = useRouter();

  const onSubmit = (formData: Partial<TProduct>) => {
    updateProduct(
      { ...data, ...formData },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  if (error || !data) {
    return <ErrorMessage message="Produto não encontrado" />;
  }

  if (isLoading) {
    return <Loader />;
  }
  return <ProductForm data={data} onSubmit={onSubmit} />;
};

export default EditProduct;
