import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitle: "",
        }}
      />
    </GluestackUIProvider>
  );
};

export default RootLayout;
