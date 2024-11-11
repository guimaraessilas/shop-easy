import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
};

export default RootLayout;
