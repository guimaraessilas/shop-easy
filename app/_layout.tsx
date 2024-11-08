import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queryClient";

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
