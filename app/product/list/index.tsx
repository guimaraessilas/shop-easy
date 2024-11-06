import ProductListItem from "../../product/components/productListItem";
import { Box } from "@/components/ui/box";
import { Fab } from "@/components/ui/fab";
import { FlatList, ActivityIndicator, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TProduct } from "@/types/TProduct";
import { useProducts } from "../useProducts";

const Home = () => {
  const { data, isLoading, error } = useProducts("male");

  const renderItem = ({ item }: { item: TProduct }) => (
    <ProductListItem product={item} />
  );

  const keyExtractor = (item: TProduct) => String(item.id);

  return (
    <Box className="bg-white flex-1 justify-center">
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <Text className="text-red-600 text-center">
          Erro ao carregar produtos.
        </Text>
      )}

      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() =>
          !isLoading && <Text>Nenhum produto disponível.</Text>
        }
      />

      <Fab
        size="lg"
        placement="bottom right"
        className="bg-blue-500"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <Ionicons name="add" size={24} color="white" />
      </Fab>
    </Box>
  );
};

export default Home;
