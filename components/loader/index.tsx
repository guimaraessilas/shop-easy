import { ActivityIndicator } from "react-native";
import { VStack } from "@/components/ui/vstack";

const Loader = () => (
  <VStack className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#0000ff" />
  </VStack>
);

export default Loader;
