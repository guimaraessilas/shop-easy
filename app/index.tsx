import products from "../mocks/products.json";
import { Product } from "../types/TProduct";
import ProductListItem from "../components/productListItem";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon } from "@/components/ui/fab";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductListItem product={item} />
  );

  const keyExtractor = (item: Product) => String(item.id);

  return (
    <Box>
      <FlatList
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        data={products.products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <FabIcon
          as={() => <Ionicons name="add" size={24} color="white" />}
        ></FabIcon>
      </Fab>
    </Box>
  );
};

export default Home;
