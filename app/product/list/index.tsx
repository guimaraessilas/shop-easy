import products from "../../../mocks/products.json";

import ProductListItem from "../../product/components/productListItem";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon } from "@/components/ui/fab";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Product } from "@/types/TProduct";

const Home = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductListItem product={item} />
  );

  const keyExtractor = (item: Product) => String(item.id);

  return (
    <Box className="bg-white">
      <FlatList
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        data={products.products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />

      <Fab
        size="lg"
        placement="bottom right"
        className="bg-blue-500"
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
