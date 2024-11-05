import { Text } from "react-native";
import { Product } from "../../types/TProduct";

const ProductListItem = ({ product }: { product: Product }) => {
  return <Text>{product.title}</Text>;
};

export default ProductListItem;
