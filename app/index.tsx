import { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";

const checkIfUserIsAuthenticated = async () => {
  // Função de mock, insira sua lógica de autenticação aqui.
  return false;
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const userAuthenticated = await checkIfUserIsAuthenticated();
      setIsAuthenticated(userAuthenticated);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) return null;

  if (isAuthenticated) {
    // Redireciona para as abas se autenticado.
    return <Redirect href="/(tabs)/home" />;
  }

  // Se não autenticado, redireciona para o login.
  return <Redirect href="/login" />;
};

export default Index;
