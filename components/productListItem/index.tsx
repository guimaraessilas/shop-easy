import { Text } from "react-native";
import { Product } from "../../types/TProduct";
import { Box } from "../ui/box";

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Box>
      <Text>{product.title}</Text>
    </Box>
  );
};

export default ProductListItem;
