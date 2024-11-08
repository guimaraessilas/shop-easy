import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { authStore } from "@/store/authStore";
import Loader from "@/components/loader";

const Index = () => {
  const { loadTokens, accessToken } = authStore((state) => state);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfUserIsLogged = async () => {
      await loadTokens();
      setIsLoading(false);
    };

    checkIfUserIsLogged();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (accessToken) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
};

export default Index;
