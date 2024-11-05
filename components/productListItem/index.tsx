import { Product } from "../../types/TProduct";
import { Card } from "../ui/card";
import { Divider } from "../ui/divider";
import { Heading } from "../ui/heading";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Card variant="outline" className="rounded-lg max-w-[180px] m-3">
      <Image
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
      <Heading size="md" className="mb-4">
        R$ {product.price}
      </Heading>
    </Card>
  );
};

export default ProductListItem;
