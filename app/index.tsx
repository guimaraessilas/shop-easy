import { FlatList } from "react-native";
import products from "../mocks/products.json";
import { Product } from "../types/TProduct";
import ProductListItem from "../components/productListItem";

const Home = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductListItem product={item} />
  );

  const keyExtractor = (item: Product) => String(item.id);

  return (
    <FlatList
      contentContainerStyle={{ alignItems: "center", backgroundColor: "white" }}
      numColumns={2}
      data={products.products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default Home;
