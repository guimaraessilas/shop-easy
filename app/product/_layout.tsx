import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { router, Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductLayout = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconContainer}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
  safeContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ProductLayout;
