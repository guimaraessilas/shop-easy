import { Text } from "@/components/ui/text";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountPrice";
import { numberToBLR } from "@/utils/numberToBLR";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { MaterialIcons } from "@expo/vector-icons";

import { useState } from "react";
import { ActivityIndicator } from "react-native";

import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { useFindProductById } from "@/hooks/products/useFindProductById";
import ConfirmationAlert from "@/components/product/confirmationModal";

const Details = () => {
  const { id } = useLocalSearchParams();
  const { mutate } = useDeleteProduct();

  const [showDialog, setShowDialog] = useState(false);
  const toggleDialogVisibility = () => setShowDialog(!showDialog);

  const { data, error, isLoading } = useFindProductById({
    productId: Number(id),
  });

  const router = useRouter();

  const handleDelete = () => {
    mutate(Number(id), {
      onSuccess: () => {
        toggleDialogVisibility();
        router.back();
      },
    });
  };

  if (error) {
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

  return (
    <Card className="flex-1 p-4">
      <ConfirmationAlert
        isOpen={showDialog}
        onClose={toggleDialogVisibility}
        action={handleDelete}
        title="Excluir Produto"
        description="Você tem certeza que deseja exluir esse produto? Essa ação não poderá ser desfeita."
        actionText="Excluir"
        actionType="warning"
      />
      <VStack className="flex-1 justify-between">
        <VStack>
          <Image
            source={{
              uri: data?.thumbnail,
            }}
            resizeMode="contain"
            className="mb-6 h-[170px] w-full rounded-md"
            alt="product related image"
          />

          <Heading size="md" className="mb-4">
            {data?.title}
          </Heading>
          <VStack className="mb-6">
            <Text size="sm">{data?.description}</Text>
          </VStack>
          <HStack space="sm" className="items-center">
            <Heading size="md" className="mb-4 text-red-600">
              {numberToBLR(
                calculateDiscountedPrice(data?.price, data?.discountPercentage)
              )}
            </Heading>
            <Text size="md" className="mb-4" strikeThrough>
              {numberToBLR(data?.price)}
            </Text>
          </HStack>
        </VStack>

        <Box className="flex-col sm:flex-row">
          <Link href={`/product/${data?.id}/edit`} asChild>
            <Button className="flex-row bg-blue-500 rounded-lg px-4 py-2 mb-3">
              <ButtonText>Editar</ButtonText>
              <MaterialIcons name="edit" size={20} color="white" />
            </Button>
          </Link>
          <Button
            onPress={toggleDialogVisibility}
            className="flex-row bg-red-500 rounded-lg px-4 py-2"
          >
            <ButtonText>Excluir</ButtonText>
            <MaterialIcons name="delete-outline" size={20} color="white" />
          </Button>
        </Box>
      </VStack>
    </Card>
  );
};

export default Details;
