import { Product } from "../../types/TProduct";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Card variant="outline" className="p-5 rounded-lg max-w-[170px] m-3">
      <Image
        source={{
          uri: product.thumbnail,
        }}
        className="mb-6 h-[167px] w-full rounded-md"
        alt="product related image"
      />
      <Heading size="md" className="mb-4">
        {product.title}
      </Heading>
      <VStack className="mb-6">
        <Text size="sm">{product.description}</Text>
      </VStack>
      <Heading size="md" className="mb-4">
        {product.price}
      </Heading>
    </Card>
  );
};

export default ProductListItem;
