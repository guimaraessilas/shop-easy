import ProductListItem from "../../../components/product/productListItem";
import { Box } from "@/components/ui/box";
import { Fab } from "@/components/ui/fab";
import { FlatList, ActivityIndicator, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { useFetchAllProducts } from "@/hooks/products/useFetchAllProducts";

type ProductsList = {
  category: "male" | "female";
};

const ProductsList = ({ category }: ProductsList) => {
  const { data, isLoading, error } = useFetchAllProducts({ category });

  const renderItem = ({ item }: { item: TProduct }) => (
    <ProductListItem product={item} />
  );

  const keyExtractor = (item: TProduct) => String(item.id);

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-center">
          Erro ao carregar produtos.
        </Text>
      </VStack>
    );
  }

  return (
    <Box className="bg-white flex-1 justify-center">
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

      <Link href={"product/create"} asChild>
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
      </Link>
    </Box>
  );
};

export default ProductsList;