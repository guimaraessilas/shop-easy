import ProductListItem from "@/components/product/productListItem";
import { Box } from "@/components/ui/box";
import { Fab } from "@/components/ui/fab";
import { FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Link } from "expo-router";
import { useFetchAllProducts } from "@/hooks/products/useFetchAllProducts";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import Loader from "@/components/loader";
import { useState } from "react";
import ErrorMessage from "@/components/errorMessage";

type ProductsList = {
  category: "male" | "female";
};

const ProductsList = ({ category }: ProductsList) => {
  const isLargeScreen = useIsLargeScreen();
  const [numColumns] = useState(isLargeScreen ? 3 : 2);
  const { data, isLoading, error } = useFetchAllProducts({ category });

  const renderItem = ({ item }: { item: TProduct }) => (
    <ProductListItem product={item} />
  );

  const keyExtractor = (item: TProduct) => String(item.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message="Erro ao carregar produtos." />;
  }

  return (
    <Box className="bg-white flex-1 justify-center">
      <FlatList
        numColumns={numColumns}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={[
          { flexGrow: 1 },
          isLargeScreen && { alignItems: "center" },
        ]}
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
