import { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";

const checkIfUserIsAuthenticated = async () => {
  return true;
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userAuthenticated = await checkIfUserIsAuthenticated();
      setIsAuthenticated(userAuthenticated);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) return null;

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
};

export default Index;
