import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { authStore } from "@/store/authStore";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator } from "react-native";

const Index = () => {
  const { loadToken, accessToken } = authStore((state) => state);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfUserIsLogged = async () => {
      await loadToken();
      setIsLoading(false);
    };

    checkIfUserIsLogged();
  }, []);

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </VStack>
    );
  }

  if (accessToken) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
};

export default Index;
