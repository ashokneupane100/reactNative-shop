import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useAuth } from "@/providers/auth-provider"; // Ensure this path is correct

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome name={props.name} size={24} color={props.color} />;
}

const TabsLayout = () => {
  const { session, mounting } = useAuth(); 
  // Handle loading and redirect states
  if (mounting) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href="/auth" />;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1BC464",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Shop",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="shopping-cart" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="list-alt" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabBar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 18,
    height: 100,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
