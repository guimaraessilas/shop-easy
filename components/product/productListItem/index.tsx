import { calculateDiscountedPrice } from "@/utils/calculateDiscountPrice";

import { Card } from "../../ui/card";
import { Divider } from "../../ui/divider";
import { Heading } from "../../ui/heading";
import { Image } from "../../ui/image";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";
import { HStack } from "../../ui/hstack";
import { Link } from "expo-router";
import { Pressable } from "react-native";

const ProductListItem = ({ product }: { product: TProduct }) => {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card variant="outline" className="rounded-lg max-w-[220px] m-3 flex-1">
          <Image
            resizeMode="contain"
            source={{
              uri: product.thumbnail,
            }}
            className="mb-6 h-[170px] w-full rounded-md"
            alt="product related image"
          />

          <Divider />

          <Heading size="md" className="mb-4">
            {product.title}
          </Heading>
          <VStack className="mb-6">
            <Text size="sm">{product.description}</Text>
          </VStack>
          <HStack space="sm" className="items-center">
            <Heading size="xs" className="mb-2">
              R${" "}
              {calculateDiscountedPrice(
                product.price,
                product.discountPercentage
              )}
            </Heading>
            <Text size="2xs" className="mb-2" strikeThrough>
              R$ {product.price}
            </Text>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;
