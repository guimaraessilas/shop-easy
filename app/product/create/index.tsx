import ProductForm from "../components/form";
import { TProduct } from "@/types/TProduct";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

const CreateProduct = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Adicionar Produto",
      headerTitleAlign: "left",
    });
  }, [navigation]);

  const onSubmit = (data: Partial<TProduct>) => {
    console.log("create: ", data);
  };

  return <ProductForm onSubmit={onSubmit} />;
};

export default CreateProduct;
