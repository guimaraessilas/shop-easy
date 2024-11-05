import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import products from "../../mocks/products.json";
import { Product } from "@/types/TProduct";
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
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const Details = () => {
  const { id } = useLocalSearchParams();

  const product: Product | undefined = products.products.find(
    (p: Product) => p.id === Number(id)
  );

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const [showDialog, setShowDialog] = useState(false);
  const toggleDialogVisibility = () => setShowDialog(!showDialog);

  return (
    <Card className="flex-1 p-4">
      <AlertDialog isOpen={showDialog} onClose={toggleDialogVisibility}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Excluir Produto
            </Heading>
            <MaterialIcons
              onPress={toggleDialogVisibility}
              name="close"
              size={20}
              color="#333"
            />
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              Você tem certeza que deseja excluir esse produto? Essa ação não
              poderá ser desfeita.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              onPress={toggleDialogVisibility}
              variant="outline"
              action="secondary"
              size="sm"
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={toggleDialogVisibility}
              size="sm"
              className="bg-red-500"
            >
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <VStack className="flex-1 justify-between">
        <VStack>
          <Image
            source={{
              uri: product.thumbnail,
            }}
            resizeMode="contain"
            className="mb-6 h-[170px] w-full rounded-md"
            alt="product related image"
          />

          <Heading size="md" className="mb-4">
            {product.title}
          </Heading>
          <VStack className="mb-6">
            <Text size="sm">{product.description}</Text>
          </VStack>
          <HStack space="sm" className="items-center">
            <Heading size="md" className="mb-4 text-red-600">
              {numberToBLR(
                calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                )
              )}
            </Heading>
            <Text size="md" className="mb-4" strikeThrough>
              {numberToBLR(product.price)}
            </Text>
          </HStack>
        </VStack>

        <Box className="flex-col sm:flex-row">
          <Button className="flex-row bg-blue-500 rounded-lg px-4 py-2 mb-3">
            <ButtonText>Editar</ButtonText>
            <MaterialIcons name="edit" size={20} color="white" />
          </Button>
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
