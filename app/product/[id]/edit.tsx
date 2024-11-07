import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { useProducts } from "../useProducts";
import { Text } from "@/components/ui/text";
import ProductForm from "../components/form";
import { TProduct } from "@/types/TProduct";
import { useState } from "react";

const EditProduct = () => {
  const { id } = useLocalSearchParams();

  const { product } = useProducts({ productId: Number(id) });
  const { data, error, isLoading } = product;

  const onSubmit = (data: Partial<TProduct>) => {
    console.log(data);
  };

  if (error || !data) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Text>Product not found</Text>
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </VStack>
    );
  }
  return <ProductForm data={data} onSubmit={onSubmit} />;
};

export default EditProduct;
