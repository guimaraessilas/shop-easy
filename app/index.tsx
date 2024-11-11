import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { authStore } from "@/store/authStore";
import Loader from "@/components/loader";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";
import "@/global.css";

const App = () => {
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

  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        {accessToken ? (
          <Redirect href="/(tabs)/home" />
        ) : (
          <Redirect href="/login" />
        )}
      </QueryClientProvider>
    </GluestackUIProvider>
  );
};

export default App;
