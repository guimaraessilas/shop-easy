import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { authStore } from "@/store/authStore";
import Loader from "@/components/loader";
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

  return accessToken ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/login" />
  );
};

export default App;
