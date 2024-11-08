import { SafeAreaView, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MaleProducts from "./male";
import FemaleProducts from "./female";
import { useState } from "react";

const renderScene = SceneMap({
  male: MaleProducts,
  female: FemaleProducts,
});

const routes = [
  { key: "male", title: "Produtos Masculinos" },
  { key: "female", title: "Produtos Femininos" },
];

const INITIAL_ROUTE_INDEX = 0;

export default function HomeLayout() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(INITIAL_ROUTE_INDEX);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#fff" }}
            indicatorStyle={{ backgroundColor: "#2567E8" }}
            labelStyle={{
              color: "#000",
            }}
            activeColor="#000"
            inactiveColor="#000"
          />
        )}
      />
    </SafeAreaView>
  );
}
